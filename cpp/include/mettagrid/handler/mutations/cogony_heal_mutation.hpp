#ifndef COGONY_HEAL_MUTATION_HPP_
#define COGONY_HEAL_MUTATION_HPP_

#include "handler/handler_context.hpp"
#include "handler/mutations/mutation.hpp"

namespace mettagrid {

class CogonyHealMutation : public Mutation {
public:
  explicit CogonyHealMutation(const CogonyHealMutationConfig& config) : _config(config) {}

  void apply(HandlerContext& ctx) override {
    auto* actor = ctx.actor;
    auto* target = ctx.target;
    if (!actor || !target) return;

    auto heal = static_cast<InventoryDelta>(actor->inventory.amount(_config.patch_id));
    if (heal > 0) {
      target->inventory.update(_config.coherence_id, heal);
    }
  }

private:
  CogonyHealMutationConfig _config;
};

}  // namespace mettagrid

#endif  // COGONY_HEAL_MUTATION_HPP_
