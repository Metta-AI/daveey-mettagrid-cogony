#ifndef COGONY_REBOOT_MUTATION_HPP_
#define COGONY_REBOOT_MUTATION_HPP_

#include <algorithm>
#include <random>
#include "handler/handler_context.hpp"
#include "handler/mutations/mutation.hpp"

namespace mettagrid {

class CogonyCogRebootMutation : public Mutation {
public:
  explicit CogonyCogRebootMutation(const CogonyCogRebootMutationConfig& config) : _config(config) {}

  void apply(HandlerContext& ctx) override {
    auto* entity = ctx.actor ? ctx.actor : ctx.target;
    if (!entity) return;
    auto* rng = ctx.rng;

    auto inv_set = [&](InventoryItem id, int val) {
      auto cur = static_cast<InventoryDelta>(entity->inventory.amount(id));
      entity->inventory.update(id, static_cast<InventoryDelta>(val) - cur);
    };

    // Clear reboot counter.
    inv_set(_config.reboot_id, 0);

    // Lose one random gear (first non-zero if no rng available).
    if (!_config.gear_ids.empty()) {
      std::vector<int> held;
      for (size_t i = 0; i < _config.gear_ids.size(); ++i) {
        if (entity->inventory.amount(_config.gear_ids[i]) > 0) {
          held.push_back(static_cast<int>(i));
        }
      }
      if (!held.empty()) {
        int pick = 0;
        if (rng) {
          std::uniform_int_distribution<int> dist(0, static_cast<int>(held.size()) - 1);
          pick = dist(*rng);
        }
        entity->inventory.update(_config.gear_ids[held[pick]], -1);
      }
    }

    // Fill coherence to effective limit.
    inv_set(_config.coherence_id, 65535);
  }

private:
  CogonyCogRebootMutationConfig _config;
};

namespace detail {

template <typename Config>
void apply_node_reboot(const Config& config, HandlerContext& ctx) {
  auto* target = ctx.target;
  if (!target) return;
  auto* rng = ctx.rng;

  auto inv_set = [&](InventoryItem id, int val) {
    auto cur = static_cast<InventoryDelta>(target->inventory.amount(id));
    target->inventory.update(id, static_cast<InventoryDelta>(val) - cur);
  };

  // 1. Clear reboot counter.
  inv_set(config.reboot_id, 0);

  // 2. Increment level.
  target->inventory.update(config.level_id, 1);
  int level = static_cast<int>(target->inventory.amount(config.level_id));

  // 3. Most-damaged subsystem gets +1 defense.
  if (!config.sys_damage_ids.empty() && !config.resist_ids.empty()) {
    int max_dmg_idx = 0;
    InventoryQuantity max_dmg_val = 0;
    for (size_t i = 0; i < config.sys_damage_ids.size(); ++i) {
      auto val = target->inventory.amount(config.sys_damage_ids[i]);
      if (val > max_dmg_val) {
        max_dmg_val = val;
        max_dmg_idx = static_cast<int>(i);
      }
    }
    if (max_dmg_val > 0 && max_dmg_idx < static_cast<int>(config.resist_ids.size())) {
      target->inventory.update(config.resist_ids[max_dmg_idx], 1);
    }
  }

  // 4. Random subsystem gets +1 offense.
  if (rng && !config.dmg_ids.empty()) {
    std::uniform_int_distribution<int> dist(0, static_cast<int>(config.dmg_ids.size()) - 1);
    int idx = dist(*rng);
    target->inventory.update(config.dmg_ids[idx], 1);
  }

  // 5. Clear all sys_damage counters.
  for (auto id : config.sys_damage_ids) {
    inv_set(id, 0);
  }

  // 6. Fill coherence to effective cap.
  inv_set(config.coherence_id, 65535);
}

}  // namespace detail

class CogonyExtractorRebootMutation : public Mutation {
public:
  explicit CogonyExtractorRebootMutation(const CogonyExtractorRebootMutationConfig& config) : _config(config) {}
  void apply(HandlerContext& ctx) override { detail::apply_node_reboot(_config, ctx); }
private:
  CogonyExtractorRebootMutationConfig _config;
};

class CogonyJunctionRebootMutation : public Mutation {
public:
  explicit CogonyJunctionRebootMutation(const CogonyJunctionRebootMutationConfig& config) : _config(config) {}
  void apply(HandlerContext& ctx) override { detail::apply_node_reboot(_config, ctx); }
private:
  CogonyJunctionRebootMutationConfig _config;
};

}  // namespace mettagrid

#endif  // COGONY_REBOOT_MUTATION_HPP_
