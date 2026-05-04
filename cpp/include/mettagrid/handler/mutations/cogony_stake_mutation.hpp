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
      if (tagged.empty()) return;
      hub = tagged[0];
    }
    if (!actor || !hub) return;

    int q = static_cast<int>(actor->inventory.amount(_config.stake_id));
    int s = static_cast<int>(hub->inventory.amount(_config.total_stake_id));

    auto set = [](auto* entity, InventoryItem id, int val) {
      auto cur = static_cast<InventoryDelta>(entity->inventory.amount(id));
      entity->inventory.update(id, static_cast<InventoryDelta>(val) - cur);
    };

    switch (_config.mode) {
    case StakeMode::CLAIM:
      break;

    case StakeMode::MINT: {
      int cost = _config.k * (s + 1);
      int creds = static_cast<int>(actor->inventory.amount(_config.creds_id));
      if (creds < cost) return;
      actor->inventory.update(_config.creds_id, -static_cast<InventoryDelta>(cost));
      hub->inventory.update(_config.curve_reserve_id, static_cast<InventoryDelta>(cost));
      actor->inventory.update(_config.stake_id, 1);
      hub->inventory.update(_config.total_stake_id, 1);
      actor->inventory.update(_config.invested_id, static_cast<InventoryDelta>(cost));
      break;
    }

    case StakeMode::BURN: {
      if (q < 1) return;
      int refund = _config.k * s;
      hub->inventory.update(_config.curve_reserve_id, -static_cast<InventoryDelta>(refund));
      actor->inventory.update(_config.creds_id, static_cast<InventoryDelta>(refund));
      actor->inventory.update(_config.stake_id, -1);
      hub->inventory.update(_config.total_stake_id, -1);
      actor->inventory.update(_config.dividends_id, static_cast<InventoryDelta>(refund));
      break;
    }
    }

    int new_s = static_cast<int>(hub->inventory.amount(_config.total_stake_id));
    set(hub, _config.stake_cost_id, _config.k * (new_s + 1));
  }

private:
  CogonyStakeMutationConfig _config;
};

}  // namespace mettagrid

#endif  // COGONY_STAKE_MUTATION_HPP_
