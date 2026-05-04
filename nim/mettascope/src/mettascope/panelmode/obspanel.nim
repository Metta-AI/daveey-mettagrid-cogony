## Observation panel: ASCII minimap + sorted entity list for the selected agent.
import
  std/[strutils, strformat, algorithm, tables],
  vmath, chroma, silky, windy,
  ../common, ../replays

const
  Dim = rgbx(120, 120, 120, 255)
  Bright = rgbx(220, 220, 220, 255)
  Cyan = rgbx(100, 200, 230, 255)
  Green = rgbx(46, 204, 113, 255)
  MapBg = rgbx(25, 25, 25, 255)
  MapWall = rgbx(80, 80, 80, 255)
  MapAgent = rgbx(100, 200, 230, 255)
  MapEntity = rgbx(200, 180, 100, 255)
  VisionR = 7

proc entityChar(tn: string): char =
  ## Single char for entity type on the ASCII map.
  if "extractor" in tn: return 'E'
  if "junction" in tn: return 'J'
  if "hub" in tn: return 'H'
  if "market" in tn: return '$'
  if "stake" in tn: return 'S'
  if "_st" in tn: return 'G'
  if "agent" in tn: return 'o'
  if "trap" in tn: return 'T'
  if "heart" in tn: return '+'
  return '?'

proc drawObsPanel*(panel: Panel, frameId: string,
    contentPos: Vec2, contentSize: Vec2) =
  ## ASCII minimap + entity list sorted by distance.
  frame(frameId, contentPos, contentSize):
    if replay.isNil or selected.isNil:
      text("Select an agent")
      return
    if not selected.isAgent:
      text("Select an agent")
      return
    let
      ap = selected.location.at
      side = VisionR * 2 + 1

    # Build grid: '.' = empty, '#' = wall, char = entity.
    var grid: array[15, array[15, char]]
    for r in 0 ..< side:
      for c in 0 ..< side:
        grid[r][c] = '.'
    grid[VisionR][VisionR] = '@'

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
      let
        gr = dr + VisionR
        gc = dc + VisionR
        tn = entity.typeName
        ntn = normalizeTypeName(tn)
      if ntn == "wall":
        grid[gr][gc] = '#'
        continue
      grid[gr][gc] = entityChar(ntn)
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

    # Draw ASCII map.
    let cellW = 8.0f
    let mapW = side.float32 * cellW
    sk.drawRect(sk.at, vec2(mapW, side.float32 * 12), MapBg)
    for r in 0 ..< side:
      var line = ""
      for c in 0 ..< side:
        line.add grid[r][c]
      let color =
        if r == VisionR: MapAgent
        else: MapWall
      discard sk.drawText(sk.textStyle, line,
        sk.at, color, clip = false)
      sk.advance(vec2(0, 12))
    sk.advance(vec2(0, 4))

    # Draw entity list sorted by distance.
    entities.sort(proc(a, b: VisEntity): int =
      result = cmp(a.dist, b.dist))
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
      if count >= 20:
        text("...")
        break
    if count == 0:
      text("(no entities nearby)")
