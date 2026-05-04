## Policy Info panel displays policy_infos metadata for the selected agent.

import
  std/[json, strformat, strutils, options],
  vmath, silky, windy,
  ../common, ../replays, ../dropdown, ../actions

var policyDrop = DropState()
let policyOptions = @["noop", "random", "baseline"]

proc parseRelativeTarget(value: JsonNode): Option[IVec2] =
  ## Parse a relative target offset from JSON.
  ##
  ## Expects either [row, col] or "row,col". Returns IVec2 with col=x, row=y.
  if value.kind == JArray and value.len == 2:
    try:
      let
        row = value[0].getInt
        col = value[1].getInt
      return some(ivec2(col.int32, row.int32))
    except:
      return none(IVec2)
  elif value.kind == JString:
    let parts = value.getStr.split(',')
    if parts.len == 2:
      try:
        let
          row = parseInt(parts[0].strip)
          col = parseInt(parts[1].strip)
        return some(ivec2(col.int32, row.int32))
      except:
        return none(IVec2)

  return none(IVec2)

proc formatPolicyValue(value: JsonNode): string =
  ## Format a policy info value into a readable string for UI display.
  case value.kind
  of JString:
    value.getStr
  of JInt:
    $value.getInt
  of JFloat:
    &"{value.getFloat:.4f}"
  of JBool:
    $value.getBool
  of JNull:
    "null"
  else:
    $value

proc wrapText(s: string, maxW: float32): string =
  ## Insert newlines to wrap text within maxW pixels.
  let charW = 7.0f
  let maxChars = max(10, int(maxW / charW))
  if s.len <= maxChars:
    return s
  var lines: seq[string]
  var i = 0
  while i < s.len:
    let end_idx = min(i + maxChars, s.len)
    lines.add(s[i ..< end_idx])
    i = end_idx
  return lines.join("\n")

proc drawPolicyInfo*(panel: Panel, frameId: string, contentPos: Vec2, contentSize: Vec2) =
  ## Draw the policy info panel with policy selector dropdown.
  frame(frameId, contentPos, contentSize):
    policyTarget = none(IVec2)

    # Policy selector dropdown.
    dropdownHeader(policyDrop, selectedPolicy)

    if selected.isNil or replay.isNil or
        not selected.isAgent:
      let picked = dropdownMenu(
        policyDrop, policyOptions)
      if picked.len > 0:
        selectedPolicy = picked
        sendAction(0, "__policy__:" & picked)
      if selected.isNil:
        text("No selected")
      elif not selected.isAgent:
        text("Select an agent")
      return

    let
      policyInfo = selected.policyInfos.at()
      policyName = selected.policyName
      maxW = contentSize.x - 16

    if policyInfo.isNil or policyInfo.kind != JObject or
        policyInfo.len == 0:
      let picked = dropdownMenu(
        policyDrop, policyOptions)
      if picked.len > 0:
        selectedPolicy = picked
        sendAction(0, "__policy__:" & picked)
      text("No policy info")
      return

    let agentPos = selected.location.at(step)

    # Pick up initial policy name from Python.
    let policyNameNode = policyInfo.getOrDefault(
      "__policy_name__")
    if not policyNameNode.isNil and
        policyNameNode.kind == JString:
      let name = policyNameNode.getStr
      if name.len > 0 and selectedPolicy != name:
        selectedPolicy = name

    for key, value in policyInfo.pairs:
      if key.startsWith("__") or key == "policy_name" or
          key == "obs_grid":
        continue
      if key == "target":
        let relOpt = parseRelativeTarget(value)
        if relOpt.isSome:
          let
            rel = relOpt.get
            abs = ivec2(
              agentPos.x + rel.x,
              agentPos.y + rel.y)
          policyTarget = some(abs)
          text(wrapText(
            &"{key}: [{rel.y},{rel.x}] -> [{abs.y},{abs.x}]",
            maxW))
        else:
          policyTarget = none(IVec2)
          text(wrapText(&"{key}: {value}", maxW))
        continue
      let formatted = formatPolicyValue(value)
      text(wrapText(&"{key}: {formatted}", maxW))

    # Draw dropdown menu last so it renders on top.
    let picked = dropdownMenu(
      policyDrop, policyOptions)
    if picked.len > 0:
      selectedPolicy = picked
      sendAction(0, "__policy__:" & picked)
