#ifndef PACKAGES_METTAGRID_CPP_INCLUDE_METTAGRID_CORE_MUTATION_CONFIG_HPP_
#define PACKAGES_METTAGRID_CPP_INCLUDE_METTAGRID_CORE_MUTATION_CONFIG_HPP_

#include <memory>
#include <string>
#include <utility>
#include <variant>
#include <vector>

#include "core/filter_config.hpp"
#include "core/game_value_config.hpp"
#include "core/types.hpp"

namespace mettagrid {

// Forward declaration
struct QueryConfig;

// Target for stats logging - which stats tracker to log to
enum class StatsTarget {
  game,  // Log to game-level stats tracker
  agent  // Log to entity's agent stats tracker
};

// Which entity to use for resolving stats target
enum class StatsEntity {
  target,  // Use the target entity (default)
  actor    // Use the actor entity
};

// ============================================================================
// Mutation Configs
// ============================================================================

struct ResourceDeltaMutationConfig {
  EntityRef entity = EntityRef::target;
  InventoryItem resource_id = 0;
  InventoryDelta delta = 0;
};

struct ResourceTransferMutationConfig {
  EntityRef source = EntityRef::actor;
  EntityRef destination = EntityRef::target;
  InventoryItem resource_id = 0;
  InventoryDelta amount = -1;             // -1 means transfer all available
  bool remove_source_when_empty = false;  // Remove source from grid when its inventory is empty
};

struct ClearInventoryMutationConfig {
  EntityRef entity = EntityRef::target;
  // List of resource IDs to clear. If empty, clears all resources.
  std::vector<InventoryItem> resource_ids;
};

struct AttackMutationConfig {
  InventoryItem weapon_resource = 0;
  InventoryItem armor_resource = 0;
  InventoryItem health_resource = 0;
  int damage_multiplier_pct = 100;  // Percentage (100 = 1.0x, 150 = 1.5x)
};

struct StatsMutationConfig {
  std::string stat_name;                     // Name of the stat to set
  StatsTarget target = StatsTarget::game;    // Which stats tracker to set
  StatsEntity entity = StatsEntity::target;  // Which entity to use for resolving target
  GameValueConfig source;                    // Game value expression to compute the new stat value
};

struct AddTagMutationConfig {
  EntityRef entity = EntityRef::target;
  int tag_id = -1;
};

struct RemoveTagMutationConfig {
  EntityRef entity = EntityRef::target;
  int tag_id = -1;
};

struct ChangeVibeMutationConfig {
  EntityRef entity = EntityRef::target;
  ObservationType vibe_id = 0;
};

struct GameValueMutationConfig {
  GameValueConfig value;
  EntityRef target = EntityRef::target;
  GameValueConfig source;  // Source of the delta (CONST for static, or any GameValue for dynamic)
};

struct RecomputeMaterializedQueryMutationConfig {
  int tag_id = -1;
};

struct QueryInventoryMutationConfig {
  std::shared_ptr<QueryConfig> query;
  std::vector<std::pair<InventoryItem, InventoryDelta>> deltas;
  EntityRef source = EntityRef::actor;  // Only used if has_source=true
  bool has_source = false;              // Transfer mode

  // Optional: log actual transfer amounts to game stats.
  // Maps resource_id -> stat_name. When present, logs the actual transferred amount.
  std::vector<std::pair<InventoryItem, std::string>> transfer_stat_names;
};

struct RemoveTagsWithPrefixMutationConfig {
  EntityRef entity = EntityRef::target;
  std::vector<int> tag_ids;  // All tag IDs sharing the prefix (resolved at config time)
};

struct RelocateMutationConfig {};    // Move actor to target cell
struct SwapMutationConfig {};        // Swap actor and target positions
struct UseTargetMutationConfig {};   // Delegate to target's onUse handler
struct PushObjectMutationConfig {};  // Push target one cell further along actor->target

// Set ctx.target_location (and ctx.target/ctx.move_direction) to a cell
// offset from the actor by (direction * distance). The direction is an
// Orientation enum value in [0,7].
struct SetRelativeTargetMutationConfig {
  int direction = 0;  // Orientation enum value (0=N, 1=S, 2=W, 3=E, 4=NW, 5=NE, 6=SW, 7=SE)
  unsigned int distance = 1;
};

struct SpawnObjectMutationConfig {
  std::string object_type;  // Object type name to spawn at target_location
};

// RaycastSpawnMutation: Walk rays from target and spawn objects at empty cells.
// Stops each ray at the first object matching any blocker filter.
struct RaycastSpawnMutationConfig {
  std::string object_type;                             // Object type to spawn
  std::vector<std::pair<int, int>> directions;         // (dr, dc) pairs for each ray direction
  GameValueConfig max_range = ConstValueConfig{2.0f};  // Max cells per arm, supports runtime GameValue
  std::vector<FilterConfig> blocker;                   // Filters that identify blocking objects
};

// Cogony-specific mutations (multi-channel combat, reboot, loot, heal).

struct CogonyAttackMutationConfig {
  // Each pair: (actor_attack_resource, target_defend_resource)
  std::vector<std::pair<InventoryItem, InventoryItem>> channels;
  InventoryItem health_id = 0;  // coherence
  // Per-channel damage tracking on target (same length as channels)
  std::vector<InventoryItem> damage_tracking_ids;
  bool strike_back = true;
  // Death drop: when target coherence drops to 0, generate rand(1, level*multiplier)
  // of drop_resource on the target. Disabled when drop_enabled is false.
  bool drop_enabled = false;
  InventoryItem drop_resource = 0;
  InventoryItem drop_level_id = 0;     // level resource for scaling
  int drop_multiplier = 10;            // max = level * multiplier
};

struct CogonyCogRebootMutationConfig {
  InventoryItem coherence_id = 0;
  InventoryItem reboot_id = 0;
  std::vector<InventoryItem> gear_ids;  // lose 1 random gear on reboot
};

struct CogonyExtractorRebootMutationConfig {
  InventoryItem coherence_id = 0;
  InventoryItem reboot_id = 0;
  InventoryItem level_id = 0;
  std::vector<InventoryItem> resist_ids;
  std::vector<InventoryItem> dmg_ids;
  std::vector<InventoryItem> sys_damage_ids;
  int coherence_per_level = 20;
  int dmg_level_offset = -3;
};

struct CogonyJunctionRebootMutationConfig {
  InventoryItem coherence_id = 0;
  InventoryItem reboot_id = 0;
  InventoryItem level_id = 0;
  std::vector<InventoryItem> resist_ids;
  std::vector<InventoryItem> dmg_ids;
  std::vector<InventoryItem> sys_damage_ids;
  int coherence_per_level = 20;
  int dmg_level_offset = -3;
};

struct CogonyLootMutationConfig {
  std::vector<InventoryItem> resource_ids;
};

struct CogonyHealMutationConfig {
  InventoryItem patch_id = 0;     // actor's heal stat
  InventoryItem coherence_id = 0; // target's health
};

struct CogonyMarketMutationConfig {
  // Element resource IDs on the actor (cargo to sell).
  std::vector<InventoryItem> element_ids;
  // Price resource IDs on the target (market), same order as element_ids.
  // Market inventory holds current price per element.
  std::vector<InventoryItem> price_ids;
  // Sold-count resource IDs on the target (tracks last N sales per element).
  std::vector<InventoryItem> sold_ids;
  InventoryItem creds_id = 0;  // actor's creds resource
  int history_window = 10;      // number of recent transactions to track
  int tax_percent = 0;           // percentage of creds kept on market (tax)
};

enum class StakeMode : int { CLAIM = 0, MINT = 1, BURN = 2 };

struct CogonyStakeMutationConfig {
  InventoryItem stake_id = 0;
  InventoryItem creds_id = 0;
  InventoryItem invested_id = 0;
  InventoryItem dividends_id = 0;
  InventoryItem total_stake_id = 0;
  InventoryItem stake_buy_price_id = 0;
  InventoryItem stake_sell_price_id = 0;
  int hub_tag_id = -1;
  int k = 10;
  StakeMode mode = StakeMode::CLAIM;
};

struct CogonyTrapTriggerMutationConfig {
  InventoryItem coherence_id = 0;
  InventoryItem scrambled_id = 0;
  InventoryItem mobile_id = 0;
  int damage = 5;
  int scramble_ticks = 10;
};

struct CogonyTrapDropMutationConfig {
  std::string object_type;
  std::vector<std::pair<std::string, int>> initial_resources;
};

struct CogonyJumpMutationConfig {};

struct CogonyHubIncomeMutationConfig {
  InventoryItem creds_id = 0;
  InventoryItem dividends_id = 0;
  InventoryItem total_stake_id = 0;
  InventoryItem stake_id = 0;
  InventoryItem stake_buy_price_id = 0;
  InventoryItem stake_sell_price_id = 0;
  int team_tag_id = -1;
  int k = 10;
  int creds_per_junction = 10;
  int creds_per_observatory = 50;
  int creds_per_datacenter = 100;
  int champion_pct = 30;
};

// Variant type for all mutation configs
using MutationConfig = std::variant<ResourceDeltaMutationConfig,
                                    ResourceTransferMutationConfig,
                                    ClearInventoryMutationConfig,
                                    AttackMutationConfig,
                                    StatsMutationConfig,
                                    AddTagMutationConfig,
                                    RemoveTagMutationConfig,
                                    GameValueMutationConfig,
                                    RecomputeMaterializedQueryMutationConfig,
                                    QueryInventoryMutationConfig,
                                    RemoveTagsWithPrefixMutationConfig,
                                    RelocateMutationConfig,
                                    SwapMutationConfig,
                                    UseTargetMutationConfig,
                                    SpawnObjectMutationConfig,
                                    RaycastSpawnMutationConfig,
                                    ChangeVibeMutationConfig,
                                    PushObjectMutationConfig,
                                    SetRelativeTargetMutationConfig,
                                    CogonyAttackMutationConfig,
                                    CogonyCogRebootMutationConfig,
                                    CogonyExtractorRebootMutationConfig,
                                    CogonyJunctionRebootMutationConfig,
                                    CogonyLootMutationConfig,
                                    CogonyHealMutationConfig,
                                    CogonyMarketMutationConfig,
                                    CogonyStakeMutationConfig,
                                    CogonyHubIncomeMutationConfig,
                                    CogonyTrapDropMutationConfig,
                                    CogonyJumpMutationConfig,
                                    CogonyTrapTriggerMutationConfig>;

}  // namespace mettagrid

#endif  // PACKAGES_METTAGRID_CPP_INCLUDE_METTAGRID_CORE_MUTATION_CONFIG_HPP_
