## Custom HUD rendering for configurable status bars in the center panel.
## Used only when object_status is explicitly set in the render config.
import
  std/[strutils, tables],
  vmath, silky, silky/atlas, chroma,
  ../[common, replays, colors]

proc resourceIconName*(itemName: string): string =
  ## Return the atlas resource name to use for inventory details.
  if itemName.endsWith("_stake_buy_price") or
      itemName.endsWith("_stake_sell_price"):
    return "creds"
  if itemName.endsWith("_total_stakes"):
    return "star"
  return itemName

proc resourceIconPath*(itemName: string): string =
  ## Return the atlas path for a resource, using Cogony aliases when needed.
  let directIcon = "resources/" & itemName
  if directIcon in sk.atlas.entries:
    return directIcon
  let aliasIcon = "resources/" & resourceIconName(itemName)
  if aliasIcon in sk.atlas.entries:
    return aliasIcon
  return ""

proc getInventoryItem(entity: Entity, itemName: string, atStep: int = step): int =
  ## Get the count of a named item in the entity's inventory at a given step.
  let itemId = replay.itemNames.find(itemName)
  if itemId < 0:
    return 0
  let inv = entity.inventory.at(atStep)
  for item in inv:
    if item.itemId == itemId:
      return item.count
  return 0

proc hasCustomHuds*(replay: Replay): bool =
  ## True when agent_huds is explicitly configured.
  replay.sortedHudItems.len > 0

proc hasCustomStatus*(replay: Replay, entity: Entity): bool =
  ## True when object_status is configured for this entity type.
  if replay.isNil or entity.isNil:
    return false
  entity.typeName in replay.sortedStatusItems or
    normalizeTypeName(entity.typeName) in replay.sortedStatusItems

proc parseBarColor*(colorName: string): ColorRGBX =
  ## Convert a color name string to an RGBX value.
  case colorName
  of "red": rgbx(231, 76, 60, 255)
  of "blue": rgbx(52, 152, 219, 255)
  of "green": rgbx(46, 204, 113, 255)
  of "white": rgbx(255, 255, 255, 255)
  else: Yellow

proc drawCustomStatBar*(panelPos: Vec2, label: string, value: int,
    maxValue: int, divisions: int, delta: int,
    barColor: ColorRGBX = Yellow, suffixText: string = "",
    iconLabel: string = "") =
  ## Draw a labeled segmented stat bar in the center panel.
  const
    LabelOffset = vec2(0, -17)
    OuterOffset = vec2(39, 0)
    BorderPx = 1
    InnerGapPx = 1
    SegmentGapPx = 1
  let OuterSize =
    if suffixText.len > 0: vec2(200, 20)
    else: vec2(260, 20)
  let
    outerPos = panelPos + OuterOffset
    safeMax = max(maxValue, 1)
    safeDivisions = max(divisions, 1)
    totalFilled = clamp(
      value.float32 / safeMax.float32 * safeDivisions.float32,
      0.0f, safeDivisions.float32)
    previousValue = value - delta
    previousFilled = clamp(
      previousValue.float32 / safeMax.float32 * safeDivisions.float32,
      0.0f, safeDivisions.float32)
    deltaStart = min(totalFilled, previousFilled)
    deltaEnd = max(totalFilled, previousFilled)
    outerX = outerPos.x.int
    outerY = outerPos.y.int
    outerW = OuterSize.x.int
    outerH = OuterSize.y.int
    innerX = outerX + BorderPx + InnerGapPx
    innerY = outerY + BorderPx + InnerGapPx
    innerW = max(0, outerW - 2 * (BorderPx + InnerGapPx))
    innerH = max(0, outerH - 2 * (BorderPx + InnerGapPx))
    text =
      if label.len >= 2:
        label[0..1]
      else:
        label
  if iconLabel.len > 0 and iconLabel in sk.atlas.entries:
    let uv = sk.atlas.entries[iconLabel]
    sk.drawQuad(
      panelPos + vec2(-1, -10), vec2(28, 28),
      vec2(uv.x.float32, uv.y.float32),
      vec2(uv.width.float32, uv.height.float32),
      rgbx(255, 255, 255, 255),
    )
  else:
    discard sk.drawText("pixelated", text, panelPos + LabelOffset, barColor,
      clip = false)
  # Stroke-only border.
  sk.drawRect(
    vec2(outerX.float32, outerY.float32),
    vec2(outerW.float32, BorderPx.float32), barColor)
  sk.drawRect(
    vec2(outerX.float32, (outerY + outerH - BorderPx).float32),
    vec2(outerW.float32, BorderPx.float32), barColor)
  sk.drawRect(
    vec2(outerX.float32, outerY.float32),
    vec2(BorderPx.float32, outerH.float32), barColor)
  sk.drawRect(
    vec2((outerX + outerW - BorderPx).float32, outerY.float32),
    vec2(BorderPx.float32, outerH.float32), barColor)
  # Segmented fill with 1px gaps and integer pixel widths.
  let
    totalGap = SegmentGapPx * (safeDivisions - 1)
    usableW = max(0, innerW - totalGap)
    baseSegW =
      if safeDivisions > 0: usableW div safeDivisions
      else: 0
    remainder =
      if safeDivisions > 0: usableW mod safeDivisions
      else: 0
  var segmentX = innerX
  for i in 0 ..< safeDivisions:
    let segmentW = baseSegW + (if i < remainder: 1 else: 0)
    if segmentW > 0:
      let segmentFillRatio = clamp(totalFilled - i.float32, 0.0f, 1.0f)
      let segmentFillW = clamp(
        (segmentW.float32 * segmentFillRatio + 0.5f).int, 0, segmentW)
      if segmentFillW > 0:
        sk.drawRect(
          vec2(segmentX.float32, innerY.float32),
          vec2(segmentFillW.float32, innerH.float32),
          barColor)
      # White delta segment at the changing edge.
      let
        segmentDeltaStart = clamp(deltaStart - i.float32, 0.0f, 1.0f)
        segmentDeltaEnd = clamp(deltaEnd - i.float32, 0.0f, 1.0f)
        segmentDeltaW = clamp(
          (segmentW.float32 * (segmentDeltaEnd - segmentDeltaStart) + 0.5f).int,
          0, segmentW)
      if segmentDeltaW > 0:
        let segmentDeltaX = segmentX + clamp(
          (segmentW.float32 * segmentDeltaStart + 0.5f).int, 0, segmentW)
        sk.drawRect(
          vec2(segmentDeltaX.float32, innerY.float32),
          vec2(segmentDeltaW.float32, innerH.float32),
          rgbx(255, 255, 255, 255))
    segmentX += segmentW + SegmentGapPx
  if suffixText.len > 0:
    let suffixPos = vec2(
      (outerX + OuterSize.x.int + 6).float32,
      outerY.float32 - 17
    )
    discard sk.drawText("pixelated", suffixText, suffixPos,
      rgbx(180, 255, 180, 200), clip = false)

const SubsystemColors*: array[4, ColorRGBX] = [
  rgbx(160, 160, 160, 255), # C (Carbon/Core) - grey
  rgbx(52, 152, 219, 255),  # O (Oxygen/OS) - blue
  rgbx(230, 230, 230, 255), # G (Germanium/Gen) - white
  rgbx(241, 196, 15, 255),  # S (Silicon/Storage) - yellow
]

const TeamColors*: array[4, ColorRGBX] = [
  rgbx(231, 76, 60, 255),   # red
  rgbx(52, 152, 219, 255),  # blue
  rgbx(46, 204, 113, 255),  # green
  rgbx(241, 196, 15, 255),  # yellow
]

proc drawStackedBar*(panelPos: Vec2, label: string,
    values: openArray[int], barColors: openArray[ColorRGBX],
    iconLabel: string = "", maxVal: int = 0) =
  ## Draw a bar with segments from multiple sources, each a different color.
  const
    LabelOffset = vec2(0, -17)
    OuterOffset = vec2(39, 0)
    OuterSize = vec2(260, 20)
    BorderPx = 1
    InnerGapPx = 1
  let
    outerX = (panelPos.x + OuterOffset.x).int
    outerY = (panelPos.y + OuterOffset.y).int
    outerW = OuterSize.x.int
    outerH = OuterSize.y.int
    innerX = outerX + BorderPx + InnerGapPx
    innerY = outerY + BorderPx + InnerGapPx
    innerW = max(0, outerW - 2 * (BorderPx + InnerGapPx))
    innerH = max(0, outerH - 2 * (BorderPx + InnerGapPx))
  if iconLabel.len > 0 and iconLabel in sk.atlas.entries:
    let uv = sk.atlas.entries[iconLabel]
    sk.drawQuad(
      panelPos + vec2(-1, -10), vec2(28, 28),
      vec2(uv.x.float32, uv.y.float32),
      vec2(uv.width.float32, uv.height.float32),
      rgbx(255, 255, 255, 255),
    )
  elif label.len > 0:
    discard sk.drawText("pixelated", label,
      panelPos + LabelOffset, rgbx(200, 200, 200, 255), clip = false)
  # Border.
  let bc = rgbx(80, 80, 80, 255)
  sk.drawRect(vec2(outerX.float32, outerY.float32),
    vec2(outerW.float32, BorderPx.float32), bc)
  sk.drawRect(vec2(outerX.float32, (outerY+outerH-BorderPx).float32),
    vec2(outerW.float32, BorderPx.float32), bc)
  sk.drawRect(vec2(outerX.float32, outerY.float32),
    vec2(BorderPx.float32, outerH.float32), bc)
  sk.drawRect(vec2((outerX+outerW-BorderPx).float32, outerY.float32),
    vec2(BorderPx.float32, outerH.float32), bc)
  # Stacked segments: each value gets its color, fill proportional to max.
  var total = 0
  for v in values: total += v
  if total == 0:
    return
  let barMax =
    if maxVal > 0: maxVal
    else: total
  var segX = innerX
  for i in 0 ..< min(values.len, barColors.len):
    let segW = max(0, values[i] * innerW div max(1, barMax))
    if segW > 0 and segX + segW <= innerX + innerW:
      sk.drawRect(vec2(segX.float32, innerY.float32),
        vec2(segW.float32, innerH.float32), barColors[i])
    segX += segW

proc drawCustomStatusBars*(selected: Entity, bcPos: Vec2): int =
  ## Draw custom status bars for the selected entity. Returns bar count.
  let
    prevStep = max(0, step - 1)
    statusConfigs = replay.statusItems(selected)
  # First pass: collect small (subsystem), cargo, and stake bars.
  var atkVals: seq[int] = @[]
  var defVals: seq[int] = @[]
  var cargoVals: seq[int] = @[]
  var stakeVals: seq[int] = @[]
  var atkMax, defMax, cargoMax, stakeMax: int = 0
  var j = 0
  while j < statusConfigs.len:
    if statusConfigs[j].bar_type == "cargo":
      cargoVals.add(getInventoryItem(selected, statusConfigs[j].resource))
      let m =
        if statusConfigs[j].max_resource.len > 0:
          getInventoryItem(selected, statusConfigs[j].max_resource)
        else:
          statusConfigs[j].max
      cargoMax = max(cargoMax, m)
      j += 1
    elif statusConfigs[j].bar_type == "stake":
      stakeVals.add(getInventoryItem(selected, statusConfigs[j].resource))
      stakeMax += statusConfigs[j].max
      j += 1
    elif statusConfigs[j].bar_type == "small" and j + 1 < statusConfigs.len and
        statusConfigs[j + 1].bar_type == "small":
      atkVals.add(getInventoryItem(selected, statusConfigs[j].resource))
      defVals.add(getInventoryItem(selected, statusConfigs[j + 1].resource))
      atkMax += statusConfigs[j].max
      defMax += statusConfigs[j + 1].max
      j += 2
    elif statusConfigs[j].bar_type == "small":
      j += 1
    else:
      j += 1

  # Second pass: draw normal bars + stacked subsystem/cargo bars.
  var yPx = 76
  var i = 0
  var drewSubsystems = false
  var drewCargo = false
  var drewStakes = false
  while i < statusConfigs.len:
    let statusCfg = statusConfigs[i]
    if statusCfg.bar_type == "stake":
      if not drewStakes:
        drewStakes = true
        drawStackedBar(bcPos + vec2(69, yPx.float32), "",
          stakeVals, TeamColors, "vibe/star",
          maxVal = stakeMax)
        yPx += 29
      i += 1
    elif statusCfg.bar_type == "cargo":
      if not drewCargo:
        drewCargo = true
        drawStackedBar(bcPos + vec2(69, yPx.float32), "",
          cargoVals, SubsystemColors, "vibe/package",
          maxVal = cargoMax)
        yPx += 29
      i += 1
    elif statusCfg.bar_type == "small":
      if not drewSubsystems:
        drewSubsystems = true
        drawStackedBar(bcPos + vec2(69, yPx.float32), "",
          atkVals, SubsystemColors, "vibe/swords",
          maxVal = atkMax)
        yPx += 29
        drawStackedBar(bcPos + vec2(69, yPx.float32), "",
          defVals, SubsystemColors, "vibe/shield",
          maxVal = defMax)
        yPx += 29
      if i + 1 < statusConfigs.len and statusConfigs[i + 1].bar_type == "small":
        i += 2
      else:
        i += 1
    else:
      var
        hud = getInventoryItem(selected, statusCfg.resource)
        prevHud = getInventoryItem(selected, statusCfg.resource, prevStep)
        barColor = parseBarColor(statusCfg.color)
      # Alt resource: when primary is 0, show alt (e.g., reboot when coherence=0).
      if hud == 0 and statusCfg.alt_resource.len > 0:
        hud = getInventoryItem(selected, statusCfg.alt_resource)
        prevHud = getInventoryItem(selected, statusCfg.alt_resource, prevStep)
        barColor = parseBarColor(statusCfg.alt_color)
      let
        barMax =
          if statusCfg.max_resource.len > 0:
            getInventoryItem(selected, statusCfg.max_resource)
          else: statusCfg.max
        barDivisions =
          if statusCfg.max_resource.len > 0: barMax
          else: statusCfg.divisions
        suffix =
          if statusCfg.suffix_resource.len > 0:
            let sv = getInventoryItem(selected, statusCfg.suffix_resource)
            "+" & $sv
          else: ""
      drawCustomStatBar(
        bcPos + vec2(69, yPx.float32),
        statusCfg.short_name, hud, barMax, barDivisions,
        hud - prevHud, barColor, suffix, statusCfg.icon_label,
      )
      i += 1
      yPx += 38
  statusConfigs.len

proc customStatusResources*(selected: Entity): seq[string] =
  ## Resources shown by custom status bars, to exclude from the resource list.
  let statusConfigs = replay.statusItems(selected)
  for statusCfg in statusConfigs:
    result.add(statusCfg.resource)
    if statusCfg.alt_resource.len > 0:
      result.add(statusCfg.alt_resource)
    if statusCfg.suffix_resource.len > 0:
      result.add(statusCfg.suffix_resource)

type CustomResources* = tuple
  resources: seq[tuple[icon: string, amount: int]]
  anchor: Vec2

proc collectCustomResources*(
    selected: Entity, bcPos: Vec2): CustomResources =
  ## Collect inventory items for a custom-status entity, excluding status bars.
  let statusResources = customStatusResources(selected)
  var resources: seq[tuple[icon: string, amount: int]] = @[]
  for item in selected.inventory.at:
    if item.count <= 0 or item.itemId < 0 or
        item.itemId >= replay.itemNames.len:
      continue
    let itemName = replay.itemNames[item.itemId]
    if itemName in @["hp", "energy", "solar", "heart", "creds"]:
      continue
    if itemName in statusResources:
      continue
    let itemIcon = resourceIconPath(itemName)
    if itemIcon.len == 0:
      continue
    resources.add((icon: itemIcon, amount: item.count))
  let statusConfigs = replay.statusItems(selected)
  var visualHeight = 0
  var idx = 0
  var countedSmall = false
  var countedCargo = false
  var countedStake = false
  while idx < statusConfigs.len:
    if statusConfigs[idx].bar_type == "stake":
      if not countedStake:
        countedStake = true
        visualHeight += 24
      idx += 1
    elif statusConfigs[idx].bar_type == "cargo":
      if not countedCargo:
        countedCargo = true
        visualHeight += 24
      idx += 1
    elif statusConfigs[idx].bar_type == "small":
      if not countedSmall:
        countedSmall = true
        visualHeight += 48
      if idx + 1 < statusConfigs.len and statusConfigs[idx + 1].bar_type == "small":
        idx += 2
      else:
        idx += 1
    else:
      visualHeight += 32
      idx += 1
  result = (
    resources: resources,
    anchor: vec2(
      bcPos.x + 59,
      bcPos.y + max(109, 87 + visualHeight).float32
    )
  )
