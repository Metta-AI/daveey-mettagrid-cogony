## Observation panel: tokens grouped by location from actual obs data.
import
  std/[strutils, strformat, algorithm, json, tables],
  vmath, chroma, silky, windy,
  ../common, ../replays

const
  Dim = rgbx(120, 120, 120, 255)
  Bright = rgbx(220, 220, 220, 255)
  Highlight = rgbx(80, 200, 240, 255)
  HighlightBg = rgbx(40, 60, 80, 255)
  TagColor = rgbx(160, 130, 200, 255)
  FeatColor = rgbx(140, 170, 140, 255)

proc drawObsPanel*(panel: Panel, frameId: string,
    contentPos: Vec2, contentSize: Vec2) =
  ## Tokens grouped by location, one per line.
  frame(frameId, contentPos, contentSize):
    if replay.isNil or selected.isNil or
        not selected.isAgent:
      text("Select an agent")
      return

    let pinfo = selected.policyInfos.at
    if pinfo.isNil or pinfo.kind != JObject:
      text("(no policy_infos)")
      return
    let ogNode = pinfo.getOrDefault("obs_grid")
    if ogNode.isNil or ogNode.kind != JObject:
      text("(no obs_grid)")
      return

    type Location = object
      dist: int
      dr, dc: int
      tags: seq[string]
      feats: seq[tuple[key: string, val: int]]
    var locs: seq[Location]

    for key, val in ogNode:
      let parts = key.split(",")
      if parts.len != 2:
        continue
      let
        dr = parseInt(parts[0].strip)
        dc = parseInt(parts[1].strip)
      var loc = Location(
        dist: abs(dr) + abs(dc),
        dr: dr, dc: dc)
      if val.kind == JObject:
        let tagsNode = val.getOrDefault("tags")
        if not tagsNode.isNil and
            tagsNode.kind == JArray:
          for t in tagsNode:
            loc.tags.add(t.getStr)
        let featsNode = val.getOrDefault("feats")
        if not featsNode.isNil and
            featsNode.kind == JObject:
          for k, v in featsNode:
            loc.feats.add((key: k, val: v.getInt))
      locs.add(loc)

    # Split into entities and walls.
    var entities, walls: seq[Location]
    for loc in locs:
      var isWall = false
      for tag in loc.tags:
        if tag == "type:wall":
          isWall = true
          break
      if isWall:
        walls.add(loc)
      else:
        entities.add(loc)

    entities.sort(proc(a, b: Location): int =
      cmp(a.dist, b.dist))
    walls.sort(proc(a, b: Location): int =
      cmp(a.dist, b.dist))

    proc drawLoc(loc: Location, w: float32) =
      let
        isSel = hasSelectedObsCell and
          selectedObsCell.dr == loc.dr and
          selectedObsCell.dc == loc.dc
        hdrColor =
          if isSel: Highlight
          else: Bright
        nLines = 1 + loc.tags.len + loc.feats.len
      if isSel:
        sk.drawRect(sk.at - vec2(2, 0),
          vec2(w - 4, nLines.float32 * 13 + 2),
          HighlightBg)
      discard sk.drawText(sk.textStyle,
        fmt"({loc.dr:+d},{loc.dc:+d}) d={loc.dist}",
        sk.at, hdrColor, clip = false)
      sk.advance(vec2(0, 13))
      for tag in loc.tags:
        discard sk.drawText(sk.textStyle,
          "  " & tag, sk.at,
          (if isSel: Highlight else: TagColor),
          clip = false)
        sk.advance(vec2(0, 13))
      for feat in loc.feats:
        discard sk.drawText(sk.textStyle,
          fmt"  {feat.key} = {feat.val}", sk.at,
          (if isSel: Highlight else: FeatColor),
          clip = false)
        sk.advance(vec2(0, 13))

    # Entities section.
    if entities.len == 0 and walls.len == 0:
      text("(no tokens in obs)")
      return
    var count = 0
    for loc in entities:
      drawLoc(loc, contentSize.x)
      count += 1
      if count >= 20:
        text("...")
        break

    # Walls section.
    if walls.len > 0:
      sk.advance(vec2(0, 6))
      discard sk.drawText(sk.textStyle,
        fmt"walls ({walls.len})", sk.at,
        Dim, clip = false)
      sk.advance(vec2(0, 13))
      var line = ""
      for w in walls:
        if line.len > 0:
          line.add " "
        line.add fmt"({w.dr:+d},{w.dc:+d})"
        if line.len > 40:
          discard sk.drawText(sk.textStyle,
            "  " & line, sk.at, Dim, clip = false)
          sk.advance(vec2(0, 13))
          line = ""
      if line.len > 0:
        discard sk.drawText(sk.textStyle,
          "  " & line, sk.at, Dim, clip = false)
        sk.advance(vec2(0, 13))
