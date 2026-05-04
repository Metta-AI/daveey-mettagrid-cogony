#ifndef COGONY_MARKET_MUTATION_HPP_
#define COGONY_MARKET_MUTATION_HPP_

#include <algorithm>
#include "handler/handler_context.hpp"
#include "handler/mutations/mutation.hpp"

namespace mettagrid {

class CogonyMarketMutation : public Mutation {
public:
  explicit CogonyMarketMutation(const CogonyMarketMutationConfig& config) : _config(config) {}

  void apply(HandlerContext& ctx) override {
    auto* actor = ctx.actor;
    auto* market = ctx.target;
    if (!actor || !market) return;

    int n = static_cast<int>(_config.element_ids.size());
    if (n == 0) return;

    // 1. Compute total creds earned: sum(actor.element[i] * market.price[i]).
    InventoryDelta total_creds = 0;
    bool has_cargo = false;
    for (int i = 0; i < n && i < static_cast<int>(_config.price_ids.size()); ++i) {
      auto qty = actor->inventory.amount(_config.element_ids[i]);
      auto price = market->inventory.amount(_config.price_ids[i]);
      if (qty > 0) {
        total_creds += static_cast<InventoryDelta>(qty) * static_cast<InventoryDelta>(price);
        has_cargo = true;
      }
    }

    if (!has_cargo) return;

    // 2. Track sold quantities on market (for price recalculation).
    for (int i = 0; i < n && i < static_cast<int>(_config.sold_ids.size()); ++i) {
      auto qty = actor->inventory.amount(_config.element_ids[i]);
      if (qty > 0) {
        market->inventory.update(_config.sold_ids[i], static_cast<InventoryDelta>(qty));
      }
    }

    // 3. Give creds to actor (minus tax). Tax stays on market.
    InventoryDelta tax = total_creds * _config.tax_percent / 100;
    actor->inventory.update(_config.creds_id, total_creds - tax);
    if (tax > 0) {
      market->inventory.update(_config.creds_id, tax);
    }

    // 4. Clear actor's elements.
    for (int i = 0; i < n; ++i) {
      auto qty = actor->inventory.amount(_config.element_ids[i]);
      if (qty > 0) {
        actor->inventory.update(_config.element_ids[i], -static_cast<InventoryDelta>(qty));
      }
    }

    // 5. Recalculate prices: rank elements by sold count (ascending).
    //    Rarest = 4 creds, then 3, 2, 1.
    struct Elem { int idx; InventoryQuantity sold; };
    std::vector<Elem> elems;
    for (int i = 0; i < n && i < static_cast<int>(_config.sold_ids.size()); ++i) {
      elems.push_back({i, market->inventory.amount(_config.sold_ids[i])});
    }
    std::sort(elems.begin(), elems.end(), [](const Elem& a, const Elem& b) {
      return a.sold < b.sold;
    });

    // Assign prices: rarest gets n, next gets n-1, etc.
    for (int rank = 0; rank < static_cast<int>(elems.size()); ++rank) {
      int price = n - rank;  // 4, 3, 2, 1 for n=4
      int idx = elems[rank].idx;
      if (idx < static_cast<int>(_config.price_ids.size())) {
        auto cur = static_cast<InventoryDelta>(market->inventory.amount(_config.price_ids[idx]));
        market->inventory.update(_config.price_ids[idx], static_cast<InventoryDelta>(price) - cur);
      }
    }

    // 6. Decay sold counts toward the history window.
    //    If total sold > window, scale down proportionally.
    int total_sold = 0;
    for (int i = 0; i < n && i < static_cast<int>(_config.sold_ids.size()); ++i) {
      total_sold += static_cast<int>(market->inventory.amount(_config.sold_ids[i]));
    }
    if (total_sold > _config.history_window) {
      for (int i = 0; i < n && i < static_cast<int>(_config.sold_ids.size()); ++i) {
        auto cur = market->inventory.amount(_config.sold_ids[i]);
        int scaled = static_cast<int>(cur) * _config.history_window / total_sold;
        auto delta = static_cast<InventoryDelta>(scaled) - static_cast<InventoryDelta>(cur);
        market->inventory.update(_config.sold_ids[i], delta);
      }
    }
  }

private:
  CogonyMarketMutationConfig _config;
};

}  // namespace mettagrid

#endif  // COGONY_MARKET_MUTATION_HPP_
