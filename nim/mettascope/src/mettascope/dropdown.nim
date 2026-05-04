## Reusable dropdown widget for mettascope panels.
import
  vmath, chroma, silky, windy, bumpy,
  ./common

const
  DropW* = 120.0f
  DropH* = 20.0f
  DropBg = rgbx(50, 50, 50, 255)
  DropHover = rgbx(70, 90, 120, 255)
  DropBorder = rgbx(80, 80, 80, 255)
  DropText = rgbx(200, 200, 200, 255)
  DropArrow = rgbx(150, 150, 150, 255)

type
  DropState* = object
    open*: bool

proc dropdown*(state: var DropState, current: string,
    options: seq[string], width: float32 = DropW): string =
  ## Draw a dropdown at the current sk.at position.
  ## Returns the picked option name, or "" if nothing was picked.
  let basePos = sk.at
  sk.drawRect(basePos, vec2(width, DropH), DropBg)
  sk.drawRect(basePos, vec2(width, 1), DropBorder)
  sk.drawRect(basePos + vec2(0, DropH - 1), vec2(width, 1), DropBorder)
  sk.drawRect(basePos, vec2(1, DropH), DropBorder)
  sk.drawRect(basePos + vec2(width - 1, 0), vec2(1, DropH), DropBorder)
  discard sk.drawText(sk.textStyle, current,
    basePos + vec2(6, 3), DropText, clip = false)
  discard sk.drawText(sk.textStyle, "v",
    basePos + vec2(width - 14, 3), DropArrow, clip = false)
  let headerRect = Rect(
    x: basePos.x, y: basePos.y, w: width, h: DropH)
  if sk.mouseHover(window, headerRect) and
      window.buttonReleased[MouseLeft]:
    state.open = not state.open
  result = ""
  if state.open:
    let menuPos = basePos + vec2(0, DropH)
    for i, name in options:
      let
        itemY = menuPos + vec2(0, i.float32 * DropH)
        itemRect = Rect(
          x: itemY.x, y: itemY.y, w: width, h: DropH)
        hover = sk.mouseHover(window, itemRect)
        bg =
          if hover: DropHover
          else: DropBg
      sk.drawRect(itemY, vec2(width, DropH), bg)
      sk.drawRect(itemY + vec2(0, DropH - 1),
        vec2(width, 1), DropBorder)
      sk.drawRect(itemY, vec2(1, DropH), DropBorder)
      sk.drawRect(itemY + vec2(width - 1, 0),
        vec2(1, DropH), DropBorder)
      discard sk.drawText(sk.textStyle, name,
        itemY + vec2(6, 3), DropText, clip = false)
      if hover and window.buttonReleased[MouseLeft]:
        result = name
        state.open = false
  sk.advance(vec2(0, DropH + 4))
