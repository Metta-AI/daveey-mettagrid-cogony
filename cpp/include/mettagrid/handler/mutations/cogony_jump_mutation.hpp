#ifndef COGONY_JUMP_MUTATION_HPP_
#define COGONY_JUMP_MUTATION_HPP_

#include "actions/orientation.hpp"
#include "handler/handler_context.hpp"
#include "handler/mutations/mutation.hpp"

namespace mettagrid {

class CogonyJumpMutation : public Mutation {
public:
  explicit CogonyJumpMutation(const CogonyJumpMutationConfig& config) : _config(config) {}

  void apply(HandlerContext& ctx) override {
    auto* actor = ctx.actor;
    if (!actor || !ctx.grid) return;

    Orientation dir = static_cast<Orientation>(ctx.move_direction);
    int dc, dr;
    getOrientationDelta(dir, dc, dr);

    auto loc = actor->location;

    // Try 2 cells first.
    GridLocation far;
    far.r = static_cast<GridCoord>(static_cast<int>(loc.r) + dr * 2);
    far.c = static_cast<GridCoord>(static_cast<int>(loc.c) + dc * 2);
    if (ctx.grid->is_valid_location(far) && ctx.grid->is_empty(far.r, far.c)) {
      ctx.grid->move_object(*actor, far);
      actor->vibe = 0;
      return;
    }

    // Fall back to 1 cell.
    GridLocation near;
    near.r = static_cast<GridCoord>(static_cast<int>(loc.r) + dr);
    near.c = static_cast<GridCoord>(static_cast<int>(loc.c) + dc);
    if (ctx.grid->is_valid_location(near) && ctx.grid->is_empty(near.r, near.c)) {
      ctx.grid->move_object(*actor, near);
    }

    actor->vibe = 0;
  }

private:
  CogonyJumpMutationConfig _config;
};

}  // namespace mettagrid

#endif  // COGONY_JUMP_MUTATION_HPP_
