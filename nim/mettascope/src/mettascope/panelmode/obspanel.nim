## Observation panel: entity list sorted by distance for the selected agent.
import
  std/[strutils, strformat, algorithm],
  vmath, chroma, silky, windy,
  ../common, ../replays

const
  Dim = rgbx(120, 120, 120, 255)
  Bright = rgbx(220, 220, 220, 255)
  VisionR = 7

proc drawObsPanel*(panel: Panel, frameId: string,
    contentPos: Vec2, contentSize: Vec2) =
  ## Entity list sorted by distance.
  frame(frameId, contentPos, contentSize):
    if replay.isNil or selected.isNil or
        not selected.isAgent:
      text("Select an agent")
      return
    let ap = selected.location.at

    type VisEntity = object
      dist: int
      dr, dc: int
      name: string
      inv: string
    var entities: seq[VisEntity]

    for entity in replay.objects:
      if not entity.alive.at:
        continue
      let
        pos = entity.location.at
        dr = pos.y - ap.y
        dc = pos.x - ap.x
      if abs(dr) > VisionR or abs(dc) > VisionR:
        continue
      if entity == selected:
        continue
      let ntn = normalizeTypeName(entity.typeName)
      if ntn == "wall":
        continue
      var invLine = ""
      for item in entity.inventory.at:
        if item.count > 0 and
            item.itemId < replay.itemNames.len:
          let name = replay.itemNames[item.itemId]
          if name in ["coherence", "creds", "heart",
              "energy", "level"]:
            if invLine.len > 0:
              invLine.add " "
            invLine.add fmt"{name[0]}:{item.count}"
      entities.add(VisEntity(
        dist: abs(dr) + abs(dc),
        dr: dr, dc: dc,
        name: ntn, inv: invLine))

    entities.sort(proc(a, b: VisEntity): int =
      cmp(a.dist, b.dist))
    var count = 0
    for e in entities:
      let label = fmt"d{e.dist:2d} ({e.dr:+3d},{e.dc:+3d}) {e.name}"
      discard sk.drawText(sk.textStyle, label,
        sk.at, Bright, clip = false)
      sk.advance(vec2(0, 13))
      if e.inv.len > 0:
        discard sk.drawText(sk.textStyle,
          "  " & e.inv, sk.at, Dim, clip = false)
        sk.advance(vec2(0, 13))
      count += 1
      if count >= 25:
        text("...")
        break
    if count == 0:
      text("(no entities nearby)")
