## LLM panel: shows the LLM conversation log for the selected agent.
import
  std/[json, strutils],
  vmath, chroma, silky, windy,
  ../common, ../replays

const
  Separator = rgbx(60, 60, 60, 255)
  Prompt = rgbx(120, 160, 200, 255)
  Response = rgbx(180, 220, 160, 255)
  ToolCall = rgbx(220, 180, 100, 255)
  Result = rgbx(160, 140, 200, 255)
  Default = rgbx(170, 170, 170, 255)
  DimLine = rgbx(100, 100, 100, 255)
  LineH = 13.0f

proc lineColor(line: string): ColorRGBX =
  ## Pick color based on line content.
  if line.startsWith("===") or
      line.startsWith("───"):
    return Separator
  if line.startsWith("LLM CALL"):
    return ToolCall
  if line.startsWith("RESPONSE"):
    return Response
  if line.startsWith("TOOL"):
    return ToolCall
  if line.startsWith("  user:"):
    return Prompt
  if line.startsWith("  assistant:"):
    return Response
  if "CALL " in line:
    return ToolCall
  if "RESULT " in line:
    return Result
  if line.startsWith("  text:") or
      line.startsWith("  tool:"):
    return Response
  return Default

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
    let logNode = pinfo.getOrDefault("llm_log")
    if logNode.isNil or logNode.kind != JString:
      text("(no llm_log)")
      return
    let logText = logNode.getStr
    if logText.len == 0:
      text("(empty log)")
      return
    let lines = logText.split('\n')
    # Render bottom-up (newest at bottom, scroll shows latest).
    for line in lines:
      if line.len == 0:
        continue
      let color = lineColor(line)
      discard sk.drawText(sk.textStyle, line,
        sk.at, color, clip = false)
      sk.advance(vec2(0, LineH))
