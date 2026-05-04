#ifndef COGONY_TRAP_TRIGGER_MUTATION_HPP_
#define COGONY_TRAP_TRIGGER_MUTATION_HPP_

#include "handler/handler_context.hpp"
#include "handler/mutations/mutation.hpp"

namespace mettagrid {

class CogonyTrapTriggerMutation : public Mutation {
public:
  explicit CogonyTrapTriggerMutation(const CogonyTrapTriggerMutationConfig& config) : _config(config) {}

  void apply(HandlerContext& ctx) override {
    auto* actor = ctx.actor;
    auto* trap = ctx.target;
    if (!trap || !ctx.grid) return;

    // If actor is a different entity (on_use: agent bumps trap), damage + relocate.
    if (actor && actor != trap && _config.damage > 0) {
      actor->inventory.update(_config.coherence_id, -static_cast<InventoryDelta>(_config.damage));
      auto cur_scrambled = static_cast<InventoryDelta>(actor->inventory.amount(_config.scrambled_id));
      actor->inventory.update(_config.scrambled_id, static_cast<InventoryDelta>(_config.scramble_ticks) - cur_scrambled);
      auto cur_mobile = static_cast<InventoryDelta>(actor->inventory.amount(_config.mobile_id));
      if (cur_mobile > 0) actor->inventory.update(_config.mobile_id, -cur_mobile);
      auto trap_loc = trap->location;
      if (ctx.tag_index) ctx.tag_index->unregister_object(trap);
      ctx.grid->remove_from_grid(*trap);
      ctx.grid->move_object(*actor, trap_loc);
    } else {
      // Event cleanup: just remove the trap from the grid.
      if (ctx.tag_index) ctx.tag_index->unregister_object(trap);
      ctx.grid->remove_from_grid(*trap);
    }
  }

private:
  CogonyTrapTriggerMutationConfig _config;
};

}  // namespace mettagrid

#endif  // COGONY_TRAP_TRIGGER_MUTATION_HPP_
