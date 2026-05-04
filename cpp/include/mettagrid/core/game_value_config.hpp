#ifndef PACKAGES_METTAGRID_CPP_INCLUDE_METTAGRID_CORE_GAME_VALUE_CONFIG_HPP_
#define PACKAGES_METTAGRID_CPP_INCLUDE_METTAGRID_CORE_GAME_VALUE_CONFIG_HPP_

#include <cstdint>
#include <memory>
#include <string>
#include <variant>
#include <vector>

namespace mettagrid {
struct QueryConfig;
}  // namespace mettagrid

enum class GameValueScope : uint8_t {
  AGENT,
  GAME,
  TARGET
};

struct InventoryValueConfig {
  GameValueScope scope = GameValueScope::AGENT;
  uint16_t id = 0;  // resource_id
};

struct StatValueConfig {
  GameValueScope scope = GameValueScope::AGENT;
  uint16_t id = 0;  // stat_id
  bool delta = false;
  std::string stat_name;  // resolved to ID at C++ init time
};

struct ConstValueConfig {
  float value = 0.0f;
};

struct SumValueConfig;  // forward declare for RandomValueConfig dynamic bounds

struct RandomValueConfig {
  int min_value = 0;
  int max_value = 1;
  std::shared_ptr<SumValueConfig> min_source;
  std::shared_ptr<SumValueConfig> max_source;
};

struct QueryInventoryValueConfig {
  uint16_t id = 0;  // resource_id
  std::shared_ptr<mettagrid::QueryConfig> query;
};

struct QueryCountValueConfig {
  std::shared_ptr<mettagrid::QueryConfig> query;
};

struct SumValueConfig;
struct RatioValueConfig;
struct MaxValueConfig;
struct MinValueConfig;
struct ExpValueConfig;

using GameValueConfig = std::variant<InventoryValueConfig,
                                     StatValueConfig,
                                     ConstValueConfig,
                                     RandomValueConfig,
                                     QueryInventoryValueConfig,
                                     QueryCountValueConfig,
                                     std::shared_ptr<SumValueConfig>,
                                     std::shared_ptr<RatioValueConfig>,
                                     std::shared_ptr<MaxValueConfig>,
                                     std::shared_ptr<MinValueConfig>,
                                     std::shared_ptr<ExpValueConfig>>;

struct SumValueConfig {
  std::vector<GameValueConfig> values;
  std::vector<float> weights;
  bool log = false;
};

struct RatioValueConfig {
  GameValueConfig numerator = ConstValueConfig{};
  GameValueConfig denominator = ConstValueConfig{};
};

struct MaxValueConfig {
  std::vector<GameValueConfig> values;
};

struct MinValueConfig {
  std::vector<GameValueConfig> values;
};

struct ExpValueConfig {
  float base = 2.0f;  // base of the exponentiation
  GameValueConfig exponent = ConstValueConfig{0.0f};  // runtime exponent
};

#endif  // PACKAGES_METTAGRID_CPP_INCLUDE_METTAGRID_CORE_GAME_VALUE_CONFIG_HPP_
