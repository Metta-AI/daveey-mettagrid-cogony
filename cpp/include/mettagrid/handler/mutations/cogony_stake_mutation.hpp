#ifndef COGONY_STAKE_MUTATION_HPP_
#define COGONY_STAKE_MUTATION_HPP_

#include "handler/handler_context.hpp"
#include "handler/mutations/mutation.hpp"

namespace mettagrid {

class CogonyStakeMutation : public Mutation {
public:
  explicit CogonyStakeMutation(const CogonyStakeMutationConfig& config) : _config(config) {}

  void apply(HandlerContext& ctx) override {
    auto* actor = ctx.actor;
    GridObject* hub = ctx.target;

    if (_config.hub_tag_id >= 0 && ctx.tag_index) {
      auto& tagged = ctx.tag_index->get_objects_with_tag(_config.hub_tag_id);
      hub = nullptr;
      for (auto* obj : tagged) {
        if (obj && obj->type_name == "hub") {
          hub = obj;
          break;
        }
      }
    }
    if (!actor || !hub) return;

    int q = static_cast<int>(actor->inventory.amount(_config.stake_id));
    int s = static_cast<int>(hub->inventory.amount(_config.total_stake_id));

    switch (_config.mode) {
    case StakeMode::CLAIM:
      break;

    case StakeMode::MINT: {
      int cost = _config.k * (s + 1);
      int creds = static_cast<int>(actor->inventory.amount(_config.creds_id));
      if (creds < cost) return;
      actor->inventory.update(_config.creds_id, -static_cast<InventoryDelta>(cost));
      actor->inventory.update(_config.stake_id, 1);
      hub->inventory.update(_config.total_stake_id, 1);
      actor->inventory.update(_config.invested_id, static_cast<InventoryDelta>(cost));
      break;
    }

    case StakeMode::BURN: {
      if (q < 1) return;
      int refund = _config.k * s;
      actor->inventory.update(_config.creds_id, static_cast<InventoryDelta>(refund));
      actor->inventory.update(_config.stake_id, -1);
      hub->inventory.update(_config.total_stake_id, -1);
      actor->inventory.update(_config.dividends_id, static_cast<InventoryDelta>(refund));
      break;
    }
    }

    int new_s = static_cast<int>(hub->inventory.amount(_config.total_stake_id));
    update_displays(ctx, hub, new_s);
  }

private:
  static void set(GridObject* entity, InventoryItem id, int val) {
    auto cur = static_cast<InventoryDelta>(entity->inventory.amount(id));
    entity->inventory.update(id, static_cast<InventoryDelta>(val) - cur);
  }

  void update_hub_display(GridObject* hub, int total_stake, int buy_price, int sell_price) const {
    set(hub, _config.total_stake_id, total_stake);
    set(hub, _config.stake_buy_price_id, buy_price);
    set(hub, _config.stake_sell_price_id, sell_price);
  }

  void update_station_display(GridObject* obj, int /*total_stake*/, int buy_price, int sell_price) const {
    if (obj->type_name == "stake_buy_station") {
      set(obj, _config.stake_buy_price_id, buy_price);
    } else if (obj->type_name == "stake_sell_station") {
      set(obj, _config.stake_sell_price_id, sell_price);
    }
  }

  void update_displays(HandlerContext& ctx, GridObject* hub, int total_stake) const {
    int buy_price = _config.k * (total_stake + 1);
    int sell_price = _config.k * total_stake;

    update_hub_display(hub, total_stake, buy_price, sell_price);

    if (_config.hub_tag_id < 0 || !ctx.tag_index) return;
    auto& tagged = ctx.tag_index->get_objects_with_tag(_config.hub_tag_id);
    for (auto* obj : tagged) {
      if (!obj) continue;
      if (obj->type_name == "hub") {
        update_hub_display(obj, total_stake, buy_price, sell_price);
      } else {
        update_station_display(obj, total_stake, buy_price, sell_price);
      }
    }
  }

  CogonyStakeMutationConfig _config;
};

}  // namespace mettagrid

#endif  // COGONY_STAKE_MUTATION_HPP_
