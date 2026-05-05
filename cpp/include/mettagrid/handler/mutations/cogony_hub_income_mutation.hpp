#ifndef COGONY_HUB_INCOME_MUTATION_HPP_
#define COGONY_HUB_INCOME_MUTATION_HPP_

#include "handler/handler_context.hpp"
#include "handler/mutations/mutation.hpp"

namespace mettagrid {

class CogonyHubIncomeMutation : public Mutation {
public:
  explicit CogonyHubIncomeMutation(const CogonyHubIncomeMutationConfig& config) : _config(config) {}

  void apply(HandlerContext& ctx) override {
    auto* hub = ctx.target;
    if (!hub || !ctx.tag_index || !ctx.grid) return;

    auto& aligned = ctx.tag_index->get_objects_with_tag(_config.team_tag_id);
    int n_junctions = 0;
    int n_observatories = 0;
    int n_datacenters = 0;
    for (auto* obj : aligned) {
      if (obj->type_name == "junction") n_junctions++;
      else if (obj->type_name == "observatory") n_observatories++;
      else if (obj->type_name == "datacenter") n_datacenters++;
    }

    int income = n_junctions * _config.creds_per_junction
               + n_observatories * _config.creds_per_observatory
               + n_datacenters * _config.creds_per_datacenter;
    if (income == 0) return;
    int total_stake = static_cast<int>(hub->inventory.amount(_config.total_stake_id));

    // Set revenue display on hub (overwrite previous period).
    auto cur_rev = static_cast<InventoryDelta>(hub->inventory.amount(_config.revenue_id));
    hub->inventory.update(_config.revenue_id, static_cast<InventoryDelta>(income) - cur_rev);

    // Find champion and collect all stakers.
    struct Staker { GridObject* agent; int stake; };
    GridObject* champion = nullptr;
    int max_stake = 0;
    std::vector<Staker> stakers;
    for (auto& obj_ptr : ctx.grid->objects) {
      if (!obj_ptr) continue;
      if (obj_ptr->type_name != "agent") continue;
      int s = static_cast<int>(obj_ptr->inventory.amount(_config.stake_id));
      if (s <= 0) continue;
      stakers.push_back({obj_ptr.get(), s});
      if (s > max_stake) {
        max_stake = s;
        champion = obj_ptr.get();
      }
    }

    // Champion gets champion_pct% of income.
    int champion_share = 0;
    if (champion != nullptr) {
      champion_share = income * _config.champion_pct / 100;
      if (champion_share > 0) {
        champion->inventory.update(_config.creds_id, static_cast<InventoryDelta>(champion_share));
        champion->inventory.update(_config.dividends_id, static_cast<InventoryDelta>(champion_share));
      }
    }

    // Distribute remaining income proportionally to all stakers.
    int pool = income - champion_share;
    if (pool > 0 && total_stake > 0) {
      for (auto& st : stakers) {
        int payout = pool * st.stake / total_stake;
        if (payout > 0) {
          st.agent->inventory.update(_config.creds_id, static_cast<InventoryDelta>(payout));
          st.agent->inventory.update(_config.dividends_id, static_cast<InventoryDelta>(payout));
        }
      }
    }
  }

private:
  CogonyHubIncomeMutationConfig _config;
};

}  // namespace mettagrid

#endif  // COGONY_HUB_INCOME_MUTATION_HPP_
