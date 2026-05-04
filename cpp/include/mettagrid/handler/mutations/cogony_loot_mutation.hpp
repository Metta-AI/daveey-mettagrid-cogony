#ifndef COGONY_LOOT_MUTATION_HPP_
#define COGONY_LOOT_MUTATION_HPP_

#include "handler/handler_context.hpp"
#include "handler/mutations/mutation.hpp"

namespace mettagrid {

class CogonyLootMutation : public Mutation {
public:
  explicit CogonyLootMutation(const CogonyLootMutationConfig& config) : _config(config) {}

  void apply(HandlerContext& ctx) override {
    auto* actor = ctx.actor;
    auto* target = ctx.target;
    if (!actor || !target) return;

    for (auto rid : _config.resource_ids) {
      auto amount = target->inventory.amount(rid);
      if (amount > 0) {
        actor->inventory.update(rid, static_cast<InventoryDelta>(amount));
        target->inventory.update(rid, -static_cast<InventoryDelta>(amount));
      }
    }
  }

private:
  CogonyLootMutationConfig _config;
};

}  // namespace mettagrid

#endif  // COGONY_LOOT_MUTATION_HPP_
