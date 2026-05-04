## ObsMap panel: graphical minimap from actual observation tokens.
import
  std/[strutils, strformat, math, json, tables],
  vmath, chroma, silky, windy,
  ../common, ../replays

const
  VisionR = 6
  Side = VisionR * 2 + 1
  OutOfRange = rgbx(10, 10, 10, 255)
  InRange = rgbx(22, 22, 28, 255)
  WallColor = rgbx(55, 55, 55, 255)
  AgentColor = rgbx(80, 200, 240, 255)
  OtherAgentC = rgbx(200, 200, 200, 255)
  ExtractorC = rgbx(46, 204, 113, 255)
  ExtractorDeadC = rgbx(80, 120, 80, 255)
  JunctionC = rgbx(160, 100, 220, 255)
  HubC = rgbx(241, 196, 15, 255)
  MarketC = rgbx(230, 150, 50, 255)
  StationC = rgbx(52, 152, 219, 255)
  TrapC = rgbx(231, 76, 60, 255)
  HeartC = rgbx(220, 50, 80, 255)
  UnknownC = rgbx(100, 100, 100, 255)
  CircleR = 6.5f

proc typeColor(typeName: string): ColorRGBX =
  ## Color from a type:xxx tag.
  if "extractor" in typeName: return ExtractorC
  if "junction" in typeName: return JunctionC
  if "hub" in typeName: return HubC
  if "market" in typeName: return MarketC
  if "station" in typeName: return StationC
  if "agent" in typeName: return OtherAgentC
  if "trap" in typeName: return TrapC
  if "heart" in typeName: return HeartC
  if "wall" in typeName: return WallColor
  return UnknownC

proc drawObsMapPanel*(panel: Panel, frameId: string,
    contentPos: Vec2, contentSize: Vec2) =
  ## Render minimap from actual observation tokens.
  frame(frameId, contentPos, contentSize):
    if replay.isNil or selected.isNil or
        not selected.isAgent:
      text("Select an agent")
      return

    let
      availW = contentSize.x - 8
      availH = contentSize.y - 24
      cellSz = min(
        availW / Side.float32,
        availH / Side.float32).max(3.0f).min(20.0f)
      mapSz = cellSz * Side.float32
      ox = sk.at.x + (availW - mapSz) * 0.5f
      oy = sk.at.y

    # Parse obs_grid from policy_infos if available.
    type CellData = object
      typeName: string
      color: ColorRGBX
    var cells: Table[tuple[r, c: int], CellData]
    var hasObsGrid = false

    let pinfo = selected.policyInfos.at
    if not pinfo.isNil and pinfo.kind == JObject:
      let ogNode = pinfo.getOrDefault("obs_grid")
      if not ogNode.isNil and ogNode.kind == JObject:
        hasObsGrid = true
        for key, val in ogNode:
          let parts = key.split(",")
          if parts.len != 2:
            continue
          let
            dr = parseInt(parts[0].strip)
            dc = parseInt(parts[1].strip)
          var tn = ""
          if val.kind == JObject:
            let tags = val.getOrDefault("tags")
            if not tags.isNil and tags.kind == JArray:
              for tag in tags:
                let s = tag.getStr
                if s.startsWith("type:"):
                  tn = s[5 .. ^1]
                  break
          let color = typeColor(tn)
          cells[(dr, dc)] = CellData(
            typeName: tn, color: color)

    # Draw grid.
    let gap = max(1.0f, cellSz * 0.08f)
    for r in 0 ..< Side:
      for c in 0 ..< Side:
        let
          px = ox + c.float32 * cellSz
          py = oy + r.float32 * cellSz
          dr = r - VisionR
          dc = c - VisionR
          dist = sqrt(
            dr.float32 * dr.float32 +
            dc.float32 * dc.float32)
          inCircle = dist <= CircleR
          bg =
            if inCircle: InRange
            else: OutOfRange
        sk.drawRect(vec2(px, py),
          vec2(cellSz, cellSz), bg)
        if not inCircle:
          continue
        let key = (r: dr, c: dc)
        if key in cells:
          let cell = cells[key]
          if "wall" in cell.typeName:
            sk.drawRect(vec2(px, py),
              vec2(cellSz, cellSz), WallColor)
          else:
            sk.drawRect(
              vec2(px + gap, py + gap),
              vec2(cellSz - gap * 2,
                cellSz - gap * 2), cell.color)

    # Agent marker in center.
    let
      cx = ox + VisionR.float32 * cellSz
      cy = oy + VisionR.float32 * cellSz
      m = cellSz * 0.15f
    sk.drawRect(vec2(cx + m, cy + m),
      vec2(cellSz - m * 2, cellSz - m * 2),
      AgentColor)

    sk.advance(vec2(0, mapSz + 4))
    let ap = selected.location.at
    let src =
      if hasObsGrid: "tokens"
      else: "no data"
    discard sk.drawText(sk.textStyle,
      fmt"({ap.x},{ap.y}) [{src}]",
      sk.at, rgbx(140, 140, 140, 255), clip = false)
    sk.advance(vec2(0, 14))
