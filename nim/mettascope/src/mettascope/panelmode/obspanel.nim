## Observation panel: entity list from actual observation tokens.
import
  std/[strutils, strformat, algorithm, json, tables],
  vmath, chroma, silky, windy,
  ../common, ../replays

const
  Dim = rgbx(120, 120, 120, 255)
  Bright = rgbx(220, 220, 220, 255)
  Highlight = rgbx(80, 200, 240, 255)
  HighlightBg = rgbx(40, 60, 80, 255)

proc drawObsPanel*(panel: Panel, frameId: string,
    contentPos: Vec2, contentSize: Vec2) =
  ## Entity list from actual obs tokens, sorted by distance.
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

    type VisEntity = object
      dist: int
      dr, dc: int
      name: string
      allFeats: string
      keyFeats: string
    var entities: seq[VisEntity]

    for key, val in ogNode:
      let parts = key.split(",")
      if parts.len != 2:
        continue
      let
        dr = parseInt(parts[0].strip)
        dc = parseInt(parts[1].strip)
      var tn = ""
      var allTags = ""
      if val.kind == JObject:
        let tags = val.getOrDefault("tags")
        if not tags.isNil and tags.kind == JArray:
          for tag in tags:
            let s = tag.getStr
            if s.startsWith("type:"):
              tn = s[5 .. ^1]
            if allTags.len > 0:
              allTags.add " "
            allTags.add s
      if tn == "wall":
        continue
      var keyStr = ""
      var allStr = ""
      if val.kind == JObject:
        let feats = val.getOrDefault("feats")
        if not feats.isNil and feats.kind == JObject:
          for k, v in feats:
            if allStr.len > 0:
              allStr.add " "
            allStr.add k & "=" & $v.getInt
            if k.startsWith("inv:"):
              let short = k[4 .. ^1]
              if short in ["coherence", "creds",
                  "heart", "energy", "level"]:
                if keyStr.len > 0:
                  keyStr.add " "
                keyStr.add short[0] & ":" &
                  $v.getInt
      entities.add(VisEntity(
        dist: abs(dr) + abs(dc),
        dr: dr, dc: dc, name: tn,
        allFeats: allStr & " " & allTags,
        keyFeats: keyStr))

    entities.sort(proc(a, b: VisEntity): int =
      cmp(a.dist, b.dist))

    var count = 0
    for e in entities:
      let
        isSel = hasSelectedObsCell and
          selectedObsCell.dr == e.dr and
          selectedObsCell.dc == e.dc
        nameColor =
          if isSel: Highlight
          else: Bright
        featColor =
          if isSel: Highlight
          else: Dim
      # Highlight background for selected cell.
      if isSel:
        let h =
          if e.allFeats.len > 0: 28.0f
          else: 14.0f
        sk.drawRect(sk.at - vec2(2, 0),
          vec2(contentSize.x - 4, h), HighlightBg)
      let label =
        fmt"d{e.dist:2d} ({e.dr:+3d},{e.dc:+3d}) {e.name}"
      discard sk.drawText(sk.textStyle, label,
        sk.at, nameColor, clip = false)
      sk.advance(vec2(0, 13))
      if isSel and e.allFeats.len > 0:
        # Show all features when selected.
        discard sk.drawText(sk.textStyle,
          "  " & e.allFeats, sk.at, featColor,
          clip = false)
        sk.advance(vec2(0, 13))
      elif e.keyFeats.len > 0:
        discard sk.drawText(sk.textStyle,
          "  " & e.keyFeats, sk.at, featColor,
          clip = false)
        sk.advance(vec2(0, 13))
      count += 1
      if count >= 25:
        text("...")
        break
    if count == 0:
      text("(no entities in obs)")
