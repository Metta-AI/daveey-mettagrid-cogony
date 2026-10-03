import
  std/assertions,
  zippy,
  mettascope/[common, replays]

const ReplayData = """{"version":4,"num_agents":0,"max_steps":2,"map_size":[10,10],"action_names":["noop"],"item_names":["ore"],"type_names":["extractor"],"objects":[{"id":1,"alive":true,"type_name":"extractor","location":[1,1],"orientation":0,"inventory":[],"inventory_max":0,"color":0}]}"""

for data in [ReplayData, compress(ReplayData, dataFormat = dfGzip),
    compress(ReplayData, dataFormat = dfZlib)]:
  let replay = loadReplay(data, "https://example.com/replay?token=fixture")
  doAssert replay.maxSteps == 2
  doAssert replay.objects.len == 1
  doAssert replay.actionNames == @["noop"]
  doAssert replay.objects[0].alive.at(1)

# A malformed payload must fail instead of producing an empty replay.
doAssertRaises(ZippyError):
  discard loadReplay("invalid replay bytes", "replay")
echo "received replay codecs passed"
