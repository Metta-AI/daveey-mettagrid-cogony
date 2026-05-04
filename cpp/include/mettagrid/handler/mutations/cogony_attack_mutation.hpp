#ifndef COGONY_ATTACK_MUTATION_HPP_
#define COGONY_ATTACK_MUTATION_HPP_

#include <algorithm>
#include <random>
#include "handler/handler_context.hpp"
#include "handler/mutations/mutation.hpp"

namespace mettagrid {

class CogonyAttackMutation : public Mutation {
public:
  explicit CogonyAttackMutation(const CogonyAttackMutationConfig& config) : _config(config) {}

  void apply(HandlerContext& ctx) override {
    auto* actor = ctx.actor;
    auto* target = ctx.target;
    if (!actor || !target) return;

    auto health_before = target->inventory.amount(_config.health_id);

    InventoryDelta total_damage = 0;
    std::vector<InventoryDelta> per_channel;
    per_channel.reserve(_config.channels.size());

    for (auto& [atk_id, def_id] : _config.channels) {
      auto atk = static_cast<InventoryDelta>(actor->inventory.amount(atk_id));
      auto def = static_cast<InventoryDelta>(target->inventory.amount(def_id));
      auto dmg = std::max(static_cast<InventoryDelta>(0), atk - def);
      per_channel.push_back(dmg);
      total_damage += dmg;
    }

    if (total_damage > 0) {
      target->inventory.update(_config.health_id, -total_damage);
    }

    // Track per-channel damage on the target.
    for (size_t i = 0; i < per_channel.size() && i < _config.damage_tracking_ids.size(); ++i) {
      if (per_channel[i] > 0) {
        target->inventory.update(_config.damage_tracking_ids[i], per_channel[i]);
      }
    }

    // Death drop: only if target was alive before and just died.
    if (health_before > 0 && target->inventory.amount(_config.health_id) == 0 && _config.drop_enabled) {
      int level = std::max(1, static_cast<int>(target->inventory.amount(_config.drop_level_id)));
      int max_drop = level * _config.drop_multiplier;
      int drop = 1;
      if (ctx.rng && max_drop > 1) {
        std::uniform_int_distribution<int> dist(1, max_drop);
        drop = dist(*ctx.rng);
      }
      target->inventory.update(_config.drop_resource, static_cast<InventoryDelta>(drop));
    }

    // Strike-back: if target survived, it attacks the actor.
    if (_config.strike_back && target->inventory.amount(_config.health_id) > 0) {
      InventoryDelta strike = 0;
      for (auto& [atk_id, def_id] : _config.channels) {
        auto t_atk = static_cast<InventoryDelta>(target->inventory.amount(atk_id));
        auto a_def = static_cast<InventoryDelta>(actor->inventory.amount(def_id));
        strike += std::max(static_cast<InventoryDelta>(0), t_atk - a_def);
      }
      if (strike > 0) {
        actor->inventory.update(_config.health_id, -strike);
      }
    }
  }

private:
  CogonyAttackMutationConfig _config;
};

}  // namespace mettagrid

#endif  // COGONY_ATTACK_MUTATION_HPP_
