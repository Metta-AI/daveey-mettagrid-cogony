## Observation panel: shows decoded obs tokens for the selected agent.
import
  std/[strutils, strformat, algorithm, tables],
  vmath, chroma, silky, windy,
  ../common, ../replays

const
  Dim = rgbx(140, 140, 140, 255)
  Bright = rgbx(220, 220, 220, 255)
  Cyan = rgbx(100, 200, 230, 255)
  Green = rgbx(46, 204, 113, 255)

proc drawObsPanel*(panel: Panel, frameId: string,
    contentPos: Vec2, contentSize: Vec2) =
  ## Show observation tokens for the selected agent.
  frame(frameId, contentPos, contentSize):
    if replay.isNil or selected.isNil:
      text("Select an agent")
      return
    if not selected.isAgent:
      text("Select an agent")
      return
    let
      agentPos = selected.location.at
      visionW = 7
      visionH = 7
      minR = agentPos.y - visionH
      maxR = agentPos.y + visionH
      minC = agentPos.x - visionW
      maxC = agentPos.x + visionW
    discard sk.drawText(
      sk.textStyle,
      fmt"Obs: agent at ({agentPos.x},{agentPos.y})",
      sk.at, Cyan, clip = false)
    sk.advance(vec2(0, 16))
    var count = 0
    for entity in replay.objects:
      if not entity.alive.at:
        continue
      let pos = entity.location.at
      if pos.x < minC or pos.x > maxC or
          pos.y < minR or pos.y > maxR:
        continue
      if entity == selected:
        continue
      let
        dx = pos.x - agentPos.x
        dy = pos.y - agentPos.y
        dist = abs(dx) + abs(dy)
        tn = entity.typeName
      discard sk.drawText(
        sk.textStyle,
        fmt"({dx:+3},{dy:+3}) d={dist} {tn}",
        sk.at, Bright, clip = false)
      sk.advance(vec2(0, 14))
      var invLine = ""
      for item in entity.inventory.at:
        if item.count > 0 and
            item.itemId < replay.itemNames.len:
          let name = replay.itemNames[item.itemId]
          if name in ["coherence", "creds", "heart",
              "energy", "level"]:
            if invLine.len > 0:
              invLine.add " "
            invLine.add fmt"{name}:{item.count}"
      if invLine.len > 0:
        discard sk.drawText(
          sk.textStyle,
          "  " & invLine,
          sk.at, Dim, clip = false)
        sk.advance(vec2(0, 14))
      count += 1
      if count >= 30:
        text("...")
        break
    if count == 0:
      text("(no nearby entities)")
