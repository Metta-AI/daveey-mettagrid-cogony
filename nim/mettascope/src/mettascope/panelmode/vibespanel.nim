## Vibe panel: set vibe for the selected agent.
## Right-click a vibe to assign a keyboard shortcut.
## Press the shortcut key to activate the vibe.

import
  std/[json, os, tables, strutils],
  vmath, chroma, bumpy, silky, windy,
  ../common, ../replays, ../actions

const
  BindableKeys = [
    (KeyQ, "Q"), (KeyE, "E"),
    (Key1, "1"), (Key2, "2"), (Key3, "3"), (Key4, "4"), (Key5, "5"),
    (Key6, "6"), (Key7, "7"), (Key8, "8"), (Key9, "9"), (Key0, "0"),
  ]

var
  vibeBindings: Table[Button, string]
  bindingsPopupVibe: string
  bindingsPopupPos: Vec2
  bindingsPopupOpen: bool
  bindingPopupClickVibe*: string

proc bindingsPath(): string =
  dataDir / "vibe_bindings.json"

proc saveBindings() =
  var j = newJObject()
  for key, vibe in vibeBindings:
    j[$ord(key)] = %vibe
  try:
    writeFile(bindingsPath(), $j)
  except:
    discard

proc loadBindings() =
  let path = bindingsPath()
  if not fileExists(path):
    vibeBindings[KeyQ] = "attack"
    vibeBindings[KeyE] = "trap"
    vibeBindings[Key1] = "default"
    vibeBindings[Key2] = "patch"
    vibeBindings[Key3] = "jump"
    saveBindings()
    return
  try:
    let j = parseJson(readFile(path))
    for k, v in j:
      vibeBindings[Button(parseInt(k))] = v.getStr
  except:
    discard

proc getVibes(): seq[string] =
  for vibe in replay.config.game.vibeNames:
    result.add("vibe/" & vibe)

proc bindingLabel*(vibeName: string): string =
  for key, vibe in vibeBindings:
    if vibe == vibeName:
      for bk in BindableKeys:
        if bk[0] == key:
          return bk[1]
  return ""

proc handleVibeHotkeys*() =
  ## Call each frame to check for vibe hotkey presses.
  if replay.isNil:
    return
  if selected.isNil or not selected.isAgent:
    return
  for key, vibe in vibeBindings:
    if window.buttonPressed[key]:
      let actionName = "change_vibe_" & vibe
      let actionId = replay.actionNames.find(actionName)
      if actionId >= 0:
        sendAction(selected.agentId, actionName)

proc openVibeBindingPopup*(vibeName: string, pos: Vec2) =
  bindingsPopupVibe = vibeName
  bindingsPopupPos = pos
  bindingsPopupOpen = true

proc vibeBindingModifierDown*(): bool =
  window.buttonDown[KeyLeftControl] or window.buttonDown[KeyRightControl]

proc beginVibeBindingClick*(vibeName: string, pos: Vec2) =
  bindingPopupClickVibe = vibeName
  openVibeBindingPopup(vibeName, pos)

proc finishVibeBindingClick*() =
  if window.buttonReleased[MouseLeft] or window.buttonReleased[MouseRight]:
    bindingPopupClickVibe = ""

proc drawBindingsPopup*() =
  ## Draw the right-click key assignment dropdown.
  if not bindingsPopupOpen:
    return

  let
    itemH = 22.0f
    popW = 80.0f
    popH = itemH * BindableKeys.len.float32 + 8
    bg = rgbx(30, 30, 40, 240)
    hoverBg = rgbx(60, 60, 80, 255)
    textCol = rgbx(220, 220, 220, 255)
    boundCol = rgbx(120, 120, 120, 255)

  sk.drawRect(bindingsPopupPos, vec2(popW, popH), bg)

  var y = bindingsPopupPos.y + 4
  for bk in BindableKeys:
    let
      key = bk[0]
      label = bk[1]
      itemRect = rect(bindingsPopupPos.x, y, popW, itemH)
      hover = sk.mouseHover(window, itemRect)
      existing = vibeBindings.getOrDefault(key, "")
      displayLabel = if existing.len > 0:
          label & "  " & existing
        else:
          label

    if hover:
      sk.drawRect(vec2(bindingsPopupPos.x, y), vec2(popW, itemH), hoverBg)
    let col = if existing.len > 0 and existing != bindingsPopupVibe:
        boundCol
      else:
        textCol
    discard sk.drawText(sk.textStyle, displayLabel,
      vec2(bindingsPopupPos.x + 8, y + 2), col, clip = false)

    if hover and window.buttonReleased[MouseLeft] and
        bindingPopupClickVibe.len == 0:
      if existing.len > 0 and existing != bindingsPopupVibe:
        vibeBindings.del(key)
      for oldKey, oldVibe in vibeBindings:
        if oldVibe == bindingsPopupVibe:
          vibeBindings.del(oldKey)
          break
      vibeBindings[key] = bindingsPopupVibe
      saveBindings()
      bindingsPopupOpen = false
    y += itemH

  if window.buttonPressed[MouseLeft] or
      window.buttonPressed[MouseRight] or
      window.buttonPressed[KeyEscape]:
    if not sk.mouseHover(window, rect(
        bindingsPopupPos.x, bindingsPopupPos.y, popW, popH)):
      bindingsPopupOpen = false

proc drawVibes*(panel: Panel, frameId: string,
    contentPos: Vec2, contentSize: Vec2) =
  if vibeBindings.len == 0:
    loadBindings()

  let m = 12.0f
  frame(frameId, contentPos, contentSize):
    let buttonWidth = 48.0f + sk.padding
    let startX = sk.at.x
    for vibe in getVibes():
      let
        vibeName = vibe.split("/")[1]
        vibeActionId = replay.actionNames.find(
          "change_vibe_" & vibeName)
      if vibeActionId == -1:
        continue

      if sk.at.x + buttonWidth >
          sk.pos.x + sk.size.x - m:
        sk.at.x = startX
        sk.at.y += 48 + m

      let
        btnPos = sk.at
        m2 = vec2(8, 8)
        s2 = sk.getImageSize(vibe) + vec2(16, 16)
        btnRect = rect(btnPos - m2, s2)
        bindingGesture = sk.mouseHover(window, btnRect) and
          (window.buttonPressed[MouseRight] or
            (window.buttonPressed[MouseLeft] and vibeBindingModifierDown()))
      if bindingGesture:
        beginVibeBindingClick(vibeName, sk.mousePos)

      iconButton(vibe):
        if bindingPopupClickVibe == vibeName:
          discard
        elif vibeBindingModifierDown():
          openVibeBindingPopup(vibeName, sk.mousePos)
        elif selected == nil or not selected.isAgent:
          return
        else:
          let shiftDown = window.buttonDown[KeyLeftShift] or
            window.buttonDown[KeyRightShift]
          if shiftDown:
            let objective = Objective(
              kind: Vibe,
              vibeActionId: vibeActionId,
              repeat: false)
            if not agentObjectives.hasKey(selected.agentId) or
                agentObjectives[selected.agentId].len == 0:
              agentObjectives[selected.agentId] = @[objective]
              agentPaths[selected.agentId] = @[
                PathAction(kind: Vibe,
                  vibeActionId: vibeActionId)]
            else:
              agentObjectives[selected.agentId].add(objective)
              if agentPaths.hasKey(selected.agentId):
                agentPaths[selected.agentId].add(
                  PathAction(kind: Vibe,
                    vibeActionId: vibeActionId))
              else:
                agentPaths[selected.agentId] = @[
                  PathAction(kind: Vibe,
                    vibeActionId: vibeActionId)]
          else:
            sendAction(selected.agentId,
              replay.actionNames[vibeActionId])

      sk.at.x += 16

      # Right-click opens binding popup. Ctrl-click is latched on mouse-down
      # because some browser runtimes clear the key state before mouse-up.
      let ctrlClick = window.buttonReleased[MouseLeft] and
        bindingPopupClickVibe == vibeName
      if sk.mouseHover(window, btnRect) and
          (window.buttonReleased[MouseRight] or ctrlClick):
        openVibeBindingPopup(vibeName, sk.mousePos)

      # Show binding label and tooltip.
      let bl = bindingLabel(vibeName)
      if bl.len > 0:
        discard sk.drawText(sk.textStyle, bl,
          vec2(btnPos.x + 10, btnPos.y - 12),
          rgbx(255, 255, 100, 255), clip = false)
      if sk.shouldShowTooltip:
        let tip = if bl.len > 0:
            vibeName & " [" & bl & "]"
          else:
            vibeName
        tooltip(tip)

  drawBindingsPopup()
  finishVibeBindingClick()
