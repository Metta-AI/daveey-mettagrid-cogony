## Reusable dropdown widget for mettascope panels.
## Call dropdownHeader() inline, then dropdownMenu() after all
## other content so the popup draws on top.
import
  vmath, chroma, silky, windy, bumpy,
  ./common

const
  DropW* = 120.0f
  DropH* = 20.0f
  DropBg = rgbx(40, 40, 40, 255)
  DropHover = rgbx(60, 80, 110, 255)
  DropBorder = rgbx(90, 90, 90, 255)
  DropText = rgbx(210, 210, 210, 255)
  DropArrow = rgbx(150, 150, 150, 255)

type
  DropState* = object
    open*: bool
    menuPos*: Vec2
    picked*: string

proc dropdownHeader*(state: var DropState, current: string,
    width: float32 = DropW) =
  ## Draw the dropdown header button. Call this inline.
  let basePos = sk.at
  sk.drawRect(basePos, vec2(width, DropH), DropBg)
  sk.drawRect(basePos, vec2(width, 1), DropBorder)
  sk.drawRect(
    basePos + vec2(0, DropH - 1), vec2(width, 1), DropBorder)
  sk.drawRect(basePos, vec2(1, DropH), DropBorder)
  sk.drawRect(
    basePos + vec2(width - 1, 0), vec2(1, DropH), DropBorder)
  discard sk.drawText(sk.textStyle, current,
    basePos + vec2(6, 3), DropText, clip = false)
  discard sk.drawText(sk.textStyle, "v",
    basePos + vec2(width - 14, 3), DropArrow, clip = false)
  let headerRect = Rect(
    x: basePos.x, y: basePos.y, w: width, h: DropH)
  if sk.mouseHover(window, headerRect) and
      window.buttonReleased[MouseLeft]:
    state.open = not state.open
  state.menuPos = basePos + vec2(0, DropH)
  state.picked = ""
  sk.advance(vec2(0, DropH + 4))

proc dropdownMenu*(state: var DropState,
    options: seq[string], width: float32 = DropW): string =
  ## Draw the popup menu on top of everything. Call after all
  ## other panel content. Returns picked name or "".
  if not state.open:
    return ""
  let
    menuPos = state.menuPos
    menuH = options.len.float32 * DropH
  sk.drawRect(menuPos, vec2(width, menuH), DropBg)
  sk.drawRect(menuPos, vec2(width, 1), DropBorder)
  sk.drawRect(
    menuPos + vec2(0, menuH - 1), vec2(width, 1), DropBorder)
  sk.drawRect(menuPos, vec2(1, menuH), DropBorder)
  sk.drawRect(
    menuPos + vec2(width - 1, 0), vec2(1, menuH), DropBorder)
  result = ""
  for i, name in options:
    let
      itemY = menuPos + vec2(0, i.float32 * DropH)
      itemRect = Rect(
        x: itemY.x, y: itemY.y, w: width, h: DropH)
      hover = sk.mouseHover(window, itemRect)
    if hover:
      sk.drawRect(itemY, vec2(width, DropH), DropHover)
    if i > 0:
      sk.drawRect(itemY, vec2(width, 1), DropBorder)
    discard sk.drawText(sk.textStyle, name,
      itemY + vec2(6, 3), DropText, clip = false)
    if hover and window.buttonReleased[MouseLeft]:
      result = name
      state.open = false
