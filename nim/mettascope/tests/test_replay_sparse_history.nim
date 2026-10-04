import
  std/json,
  vmath,
  mettascope/[common, replays]

const ReplayData = """{"version":4,"num_agents":1,"max_steps":10000,"map_size":[10,10],"action_names":["noop"],"item_names":["ore"],"type_names":["wall","agent"],"objects":[{"id":1,"alive":[[0,true]],"type_name":"wall","location":[[0,[1,1]]],"orientation":[[0,0]],"inventory":[],"inventory_max":0,"color":[[0,0]],"policy_infos":[[0,{"goal":"stationary"}]]},{"id":2,"agent_id":0,"alive":[[0,true],[7,false]],"type_name":"agent","location":[[0,[2,2]],[3,[4,5]]],"orientation":0,"inventory":[[0,[[0,5]]],[4,[[0,8]]]],"inventory_max":10,"color":0}]}"""

let data = parseJson(ReplayData)
data["objects"][0]["inventory"] = %* [[0, 6]]
data["objects"][0]["inventory_capacities"] = %* [[0, 12]]
data["num_agents"] = %2
data["objects"].add(%* {
  "id": 3, "agent_id": 1, "alive": true, "type_name": "agent",
  "location": [3, 3], "orientation": 0, "color": 0,
  "inventory": [[0, []], [1, [[0, 3]]], [2, [[0, 1]]]],
  "inventory_max": 10
})
let replay = loadReplayString($data, "sparse-history.json")
doAssert replay.maxSteps == 10000
let
  stationary = replay.objects[0]
  changing = replay.objects[1]
  following = replay.objects[2]
doAssert stationary.location.len == 1
doAssert stationary.alive.len == 1
doAssert stationary.policyInfos.len == 1
doAssert stationary.inventory.len == 1
doAssert stationary.inventoryCapacities.len == 1
doAssert changing.location.len == 4
doAssert changing.alive.len == 8
doAssert changing.inventory.len == 5
for step in 0 ..< replay.maxSteps:
  doAssert stationary.location.at(step) == ivec2(1, 1)
  doAssert stationary.alive.at(step)
  doAssert stationary.inventory.at(step)[0].count == 6
  doAssert stationary.inventoryCapacities.at(step)[0].limit == 12
  doAssert stationary.policyInfos.at(step)["goal"].getStr == "stationary"
  doAssert changing.location.at(step) ==
    (if step < 3: ivec2(2, 2) else: ivec2(4, 5))
  doAssert changing.alive.at(step) == (step < 7)
  doAssert changing.inventory.at(step)[0].count ==
    (if step < 4: 5 else: 8)
doAssert changing.gainMap.at(0)[0].count == 5
doAssert changing.gainMap.at(4)[0].count == 3
doAssert changing.gainMap.at(9999).len == 0
doAssert following.inventory.at(0).len == 0
doAssert following.gainMap.at(0).len == 0
doAssert following.gainMap.at(1)[0].count == 3
doAssert following.gainMap.at(2)[0].count == -2
doAssert following.gainMap.at(9999).len == 0
for step in 1 ..< replay.maxSteps:
  doAssert following.inventory.at(step)[0].count ==
    (if step == 1: 3 else: 1)
echo "sparse histories preserve all 10000 frames without repeated tails"
