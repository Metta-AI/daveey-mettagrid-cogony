#ifndef COGONY_TRAP_DROP_MUTATION_HPP_
#define COGONY_TRAP_DROP_MUTATION_HPP_

#include "config/mettagrid_config.hpp"
#include "core/grid_object_factory.hpp"
#include "handler/handler_context.hpp"
#include "handler/mutations/mutation.hpp"

namespace mettagrid {

class CogonyTrapDropMutation : public Mutation {
public:
  explicit CogonyTrapDropMutation(const CogonyTrapDropMutationConfig& config) : _config(config) {}

  void apply(HandlerContext& ctx) override {
    auto* actor = ctx.actor;
    if (!actor || !ctx.grid || !ctx.game_config) return;

    auto old_loc = actor->location;

    if (!ctx.grid->move_object(*actor, ctx.target_location)) return;

    auto it = ctx.game_config->objects.find(_config.object_type);
    if (it == ctx.game_config->objects.end()) return;

    auto* trap = create_object_from_config(
        old_loc.r, old_loc.c, it->second.get(),
        ctx.game_stats, &ctx.game_config->resource_names,
        ctx.grid, nullptr, nullptr, ctx.tag_index);
    if (!trap) return;

    if (!ctx.grid->add_object(trap)) {
      delete trap;
      return;
    }
    if (ctx.tag_index) ctx.tag_index->register_object(trap);

    const auto& rnames = ctx.game_config->resource_names;
    for (const auto& [name, amount] : _config.initial_resources) {
      for (size_t i = 0; i < rnames.size(); i++) {
        if (rnames[i] == name) {
          trap->inventory.update(static_cast<InventoryItem>(i),
                                 static_cast<InventoryDelta>(amount), true, false);
          break;
        }
      }
    }

    actor->vibe = 0;
  }

private:
  CogonyTrapDropMutationConfig _config;
};

}  // namespace mettagrid

#endif  // COGONY_TRAP_DROP_MUTATION_HPP_
