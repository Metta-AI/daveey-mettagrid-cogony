## LLM panel: shows the LLM conversation log for the selected agent.
import
  std/[json, strutils],
  vmath, chroma, silky, windy,
  ../common, ../replays

const
  SepColor = rgbx(50, 50, 50, 255)
  HeaderColor = rgbx(220, 180, 100, 255)
  UserColor = rgbx(120, 170, 220, 255)
  AssistColor = rgbx(160, 220, 140, 255)
  ToolColor = rgbx(240, 190, 80, 255)
  ResultColor = rgbx(170, 140, 210, 255)
  SystemColor = rgbx(100, 100, 100, 255)
  DefaultColor = rgbx(180, 180, 180, 255)
  Font = "H1"
  LineH = 34.0f

proc lineColor(line: string): ColorRGBX =
  ## Pick color based on line prefix.
  if line.startsWith("===") or
      line.startsWith("---"):
    return SepColor
  if line.startsWith("LLM CALL") or
      line.startsWith("RESPONSE"):
    return HeaderColor
  if line.startsWith("TOOL"):
    return ToolColor
  if line.startsWith("SYSTEM"):
    return SystemColor
  if line.startsWith("  user:"):
    return UserColor
  if line.startsWith("  assistant:"):
    return AssistColor
  if "CALL " in line:
    return ToolColor
  if "RESULT " in line:
    return ResultColor
  if line.startsWith("  text:") or
      line.startsWith("  tool:"):
    return AssistColor
  return DefaultColor

proc drawLlmPanel*(panel: Panel, frameId: string,
    contentPos: Vec2, contentSize: Vec2) =
  ## Render the LLM conversation log.
  frame(frameId, contentPos, contentSize):
    if replay.isNil or selected.isNil or
        not selected.isAgent:
      text("Select an agent")
      return
    let pinfo = selected.policyInfos.at
    if pinfo.isNil or pinfo.kind != JObject:
      text("(no policy_infos)")
      return

    let maxW = contentSize.x - 8
    let charsPerLine = max(20, int(maxW / 16.0f))

    # Show system prompt if available.
    let sysNode = pinfo.getOrDefault("llm_system")
    if not sysNode.isNil and sysNode.kind == JString:
      let sys = sysNode.getStr
      if sys.len > 0:
        discard sk.drawText(Font, "SYSTEM PROMPT",
          sk.at, SystemColor, clip = false)
        sk.advance(vec2(0, LineH))
        # Wrap and render.
        var i = 0
        while i < sys.len:
          let end_idx = min(i + charsPerLine, sys.len)
          let chunk = sys[i ..< end_idx]
          discard sk.drawText(Font, "  " & chunk,
            sk.at, SystemColor, clip = false)
          sk.advance(vec2(0, LineH))
          i = end_idx
        sk.advance(vec2(0, 4))

    let logNode = pinfo.getOrDefault("llm_log")
    if logNode.isNil or logNode.kind != JString:
      text("(no llm_log)")
      return
    let logText = logNode.getStr
    if logText.len == 0:
      text("(empty log)")
      return
    let lines = logText.split('\n')
    for line in lines:
      if line.len == 0:
        continue
      let color = lineColor(line)
      # Wrap long lines.
      if line.len <= charsPerLine:
        discard sk.drawText(Font, line,
          sk.at, color, clip = false)
        sk.advance(vec2(0, LineH))
      else:
        var i = 0
        while i < line.len:
          let end_idx = min(i + charsPerLine, line.len)
          let chunk = line[i ..< end_idx]
          discard sk.drawText(Font, chunk,
            sk.at, color, clip = false)
          sk.advance(vec2(0, LineH))
          i = end_idx
