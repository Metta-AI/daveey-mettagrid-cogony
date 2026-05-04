## ObsMap panel: graphical minimap of the selected agent's observation.
import
  std/[strutils, strformat],
  vmath, chroma, silky, windy,
  ../common, ../replays

const
  VisionR = 7
  Side = VisionR * 2 + 1
  Empty = rgbx(20, 20, 20, 255)
  Wall = rgbx(60, 60, 60, 255)
  Agent = rgbx(80, 200, 240, 255)
  OtherAgent = rgbx(200, 200, 200, 255)
  Extractor = rgbx(46, 204, 113, 255)
  ExtractorDead = rgbx(80, 120, 80, 255)
  Junction = rgbx(160, 100, 220, 255)
  Hub = rgbx(241, 196, 15, 255)
  Market = rgbx(230, 150, 50, 255)
  Station = rgbx(52, 152, 219, 255)
  Trap = rgbx(231, 76, 60, 255)
  Heart = rgbx(220, 50, 80, 255)
  Unknown = rgbx(100, 100, 100, 255)

template has(tn, sub: string): bool =
  sub in tn

proc entityColor(tn: string, coh: int): ColorRGBX =
  ## Color for an entity on the minimap.
  if tn.has("extractor"):
    return if coh > 0: Extractor else: ExtractorDead
  if tn.has("junction"): return Junction
  if tn.has("hub"): return Hub
  if tn.has("market"): return Market
  if tn.has("_st") or tn.has("station"):
    return Station
  if tn.has("agent"): return OtherAgent
  if tn.has("trap"): return Trap
  if tn.has("heart"): return Heart
  return Unknown

proc drawObsMapPanel*(panel: Panel, frameId: string,
    contentPos: Vec2, contentSize: Vec2) =
  ## Render a graphical minimap of the agent's FOV.
  frame(frameId, contentPos, contentSize):
    if replay.isNil or selected.isNil or
        not selected.isAgent:
      text("Select an agent")
      return
    let
      ap = selected.location.at
      availW = contentSize.x - 8
      availH = contentSize.y - 24
      cellSz = min(availW / Side.float32,
        availH / Side.float32).max(2.0f).min(16.0f)
      mapW = cellSz * Side.float32
      mapH = cellSz * Side.float32
      ox = sk.at.x + (availW - mapW) * 0.5f
      oy = sk.at.y

    # Background.
    sk.drawRect(vec2(ox, oy), vec2(mapW, mapH), Empty)

    # Gather entities into grid.
    type Cell = object
      kind: int  # 0=empty, 1=wall, 2=entity
      color: ColorRGBX
    var grid: array[Side, array[Side, Cell]]

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
        tn = normalizeTypeName(entity.typeName)
      if tn == "wall":
        grid[gr][gc] = Cell(kind: 1, color: Wall)
      else:
        var coh = 0
        for item in entity.inventory.at:
          if item.itemId < replay.itemNames.len and
              replay.itemNames[item.itemId] == "coherence":
            coh = item.count
        grid[gr][gc] = Cell(kind: 2,
          color: entityColor(tn, coh))

    # Draw cells.
    let gap = max(1.0f, cellSz * 0.1f)
    for r in 0 ..< Side:
      for c in 0 ..< Side:
        let
          px = ox + c.float32 * cellSz
          py = oy + r.float32 * cellSz
          cell = grid[r][c]
        if cell.kind == 1:
          sk.drawRect(vec2(px, py),
            vec2(cellSz, cellSz), Wall)
        elif cell.kind == 2:
          sk.drawRect(vec2(px + gap, py + gap),
            vec2(cellSz - gap * 2, cellSz - gap * 2),
            cell.color)

    # Agent marker in center.
    let
      cx = ox + VisionR.float32 * cellSz
      cy = oy + VisionR.float32 * cellSz
      m = cellSz * 0.15f
    sk.drawRect(vec2(cx + m, cy + m),
      vec2(cellSz - m * 2, cellSz - m * 2), Agent)

    sk.advance(vec2(0, mapH + 4))
    discard sk.drawText(sk.textStyle,
      fmt"({ap.x},{ap.y})",
      sk.at, rgbx(140, 140, 140, 255), clip = false)
    sk.advance(vec2(0, 14))
