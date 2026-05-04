## Cogue panel: concise cogony-specific object display with visual bars.
## Renders differently based on object type (agent, extractor, market, hub, etc).
import
  std/[strutils, strformat],
  vmath, chroma, silky, windy,
  ../common, ../replays, ../cognames, ../actions

proc getInv*(entity: Entity, name: string, atStep: int = step): int =
  ## Get inventory value for a resource by name.
  let idx = replay.itemNames.find(name)
  if idx < 0:
    return 0
  for item in entity.inventory.at(atStep):
    if item.itemId == idx:
      return item.count
  return 0

const
  BarH* = 14.0f
  BarW* = 160.0f
  LabelW* = 70.0f
  Green* = rgbx(46, 204, 113, 255)
  Blue* = rgbx(52, 152, 219, 255)
  Red* = rgbx(231, 76, 60, 255)
  DarkGrey* = rgbx(40, 40, 40, 255)
  Grey* = rgbx(80, 80, 80, 255)
  Yellow* = rgbx(241, 196, 15, 255)
  White* = rgbx(200, 200, 200, 255)
  CargoGrey* = rgbx(160, 160, 160, 255)
  CargoBlue* = rgbx(52, 152, 219, 255)
  CargoWhite* = rgbx(230, 230, 230, 255)
  CargoYellow* = rgbx(241, 196, 15, 255)
  TeamRed* = rgbx(231, 76, 60, 255)
  TeamBlue* = rgbx(52, 152, 219, 255)
  TeamGreen* = rgbx(46, 204, 113, 255)
  TeamYellow* = rgbx(241, 196, 15, 255)
  SubBarW* = 80.0f
  SubGap* = 30.0f

proc colorBar*(label: string, value, maxVal: int, color: ColorRGBX) =
  ## Draw a labeled bar: "label  [====    ] value/max".
  let
    safeMax = max(maxVal, 1)
    fill = clamp(value.float32 / safeMax.float32, 0, 1)
    barX = sk.at.x + LabelW
    barY = sk.at.y
  discard sk.drawText(sk.textStyle, label,
    vec2(sk.at.x, barY), White, clip = false)
  sk.drawRect(vec2(barX, barY + 2), vec2(BarW, BarH), DarkGrey)
  if fill > 0:
    sk.drawRect(vec2(barX, barY + 2), vec2(BarW * fill, BarH), color)
  discard sk.drawText(sk.textStyle, $value & "/" & $maxVal,
    vec2(barX + BarW + 6, barY), White, clip = false)
  sk.advance(vec2(0, BarH + 6))

proc drawCoherenceBar*(entity: Entity, maxCohOverride: int = 0) =
  ## Draw coherence or reboot bar.
  let
    coh = getInv(entity, "coherence")
    maxCoh = if maxCohOverride > 0: maxCohOverride
             else: max(getInv(entity, "max_coherence"), 1)
  if coh > 0:
    let coreA = getInv(entity, "core_a")
    colorBar(fmt"CO +{1+coreA}", coh, maxCoh, Green)
  else:
    let reboot = getInv(entity, "reboot")
    colorBar("REBOOT", reboot, maxCoh, Blue)

proc drawSubsystems*(entity: Entity) =
  ## Draw ATK/DEF subsystem bars.
  let defCol = sk.at.x + LabelW + SubBarW + SubGap
  discard sk.drawText(sk.textStyle, "ATK",
    vec2(sk.at.x + LabelW, sk.at.y), Red, clip = false)
  discard sk.drawText(sk.textStyle, "DEF",
    vec2(defCol, sk.at.y), Blue, clip = false)
  sk.advance(vec2(0, BarH + 2))
  const Subs = [
    ("Core", "core_a", "core_d"),
    ("OS", "os_a", "os_d"),
    ("Gen", "gen_a", "gen_d"),
    ("Stor", "storage_a", "storage_d"),
  ]
  for sub in Subs:
    let
      a = getInv(entity, sub[1])
      d = getInv(entity, sub[2])
      y = sk.at.y
      atkX = sk.at.x + LabelW
    discard sk.drawText(sk.textStyle, sub[0],
      vec2(sk.at.x, y), White, clip = false)
    sk.drawRect(vec2(atkX, y + 2), vec2(SubBarW, BarH - 2), DarkGrey)
    if a > 0:
      sk.drawRect(vec2(atkX, y + 2),
        vec2(SubBarW * clamp(a.float32 / 20.0f, 0, 1), BarH - 2), Red)
    discard sk.drawText(sk.textStyle, $a,
      vec2(atkX + SubBarW + 4, y), White, clip = false)
    sk.drawRect(vec2(defCol, y + 2), vec2(SubBarW, BarH - 2), DarkGrey)
    if d > 0:
      sk.drawRect(vec2(defCol, y + 2),
        vec2(SubBarW * clamp(d.float32 / 20.0f, 0, 1), BarH - 2), Blue)
    discard sk.drawText(sk.textStyle, $d,
      vec2(defCol + SubBarW + 4, y), White, clip = false)
    sk.advance(vec2(0, BarH + 2))

proc drawCargoBar*(entity: Entity) =
  ## Draw stacked COGS-colored cargo bar.
  let
    carbon = getInv(entity, "carbon")
    oxygen = getInv(entity, "oxygen")
    germanium = getInv(entity, "germanium")
    silicon = getInv(entity, "silicon")
    maxCargo = max(getInv(entity, "max_cargo"), 1)
    totalCargo = carbon + oxygen + germanium + silicon
    barX = sk.at.x + LabelW
    y = sk.at.y
  discard sk.drawText(sk.textStyle, "Cargo",
    vec2(sk.at.x, y), White, clip = false)
  sk.drawRect(vec2(barX, y + 2), vec2(BarW, BarH), DarkGrey)
  var cx = barX
  let elems = [(carbon, CargoGrey), (oxygen, CargoBlue),
               (germanium, CargoWhite), (silicon, CargoYellow)]
  for el in elems:
    if el[0] > 0:
      let w = BarW * el[0].float32 / maxCargo.float32
      sk.drawRect(vec2(cx, y + 2), vec2(w, BarH), el[1])
      cx += w
  discard sk.drawText(sk.textStyle, fmt"{totalCargo}/{maxCargo}",
    vec2(barX + BarW + 6, y), White, clip = false)
  sk.advance(vec2(0, BarH + 6))

proc drawAgentView(entity: Entity) =
  ## Full agent display.
  let name = getCogName(entity.agentId)
  let vibeName = getVibeName(entity.vibeId.at)
  text(fmt"{name}  [{vibeName}]")
  drawCoherenceBar(entity)
  let
    energy = getInv(entity, "energy")
    maxEnergy = max(getInv(entity, "max_energy"), 1)
    genA = getInv(entity, "gen_a")
  colorBar(fmt"EN +{1+genA}", energy, maxEnergy, Blue)
  let
    heart = getInv(entity, "heart")
    creds = getInv(entity, "creds")
  discard sk.drawText(sk.textStyle,
    fmt"Heart: {heart}    Creds: {creds}",
    sk.at, Yellow, clip = false)
  sk.advance(vec2(0, BarH + 6))
  drawSubsystems(entity)
  drawCargoBar(entity)

proc drawNodeView(entity: Entity) =
  ## Extractor / junction display.
  let level = getInv(entity, "level")
  text(fmt"{entity.typeName}")
  colorBar("Level", level, 20, Yellow)
  drawCoherenceBar(entity, level * 20)
  drawSubsystems(entity)

proc drawMarketView(entity: Entity) =
  ## Market station display: prices, sold counts, creds collected.
  text("Market Station")
  # Current prices (stored as element quantities on market).
  const Elements = ["carbon", "oxygen", "germanium", "silicon"]
  const ElemColors = [CargoGrey, CargoBlue, CargoWhite, CargoYellow]
  const ElemLabels = ["C", "O", "G", "S"]

  discard sk.drawText(sk.textStyle, "Prices",
    sk.at, Yellow, clip = false)
  sk.advance(vec2(0, BarH + 2))
  for i in 0 ..< 4:
    let price = getInv(entity, Elements[i])
    let sold = getInv(entity, "sold_" & Elements[i])
    let y = sk.at.y
    sk.drawRect(vec2(sk.at.x + 4, y + 3), vec2(10, 10), ElemColors[i])
    discard sk.drawText(sk.textStyle,
      fmt"{ElemLabels[i]}  price:{price}  sold:{sold}",
      vec2(sk.at.x + 20, y), White, clip = false)
    sk.advance(vec2(0, BarH + 2))


proc drawHubView(entity: Entity) =
  ## Hub display: stakes, revenue, reserves.
  text(fmt"{entity.typeName}")
  let
    totalStake = getInv(entity, "total_stake")
    stakeCost = getInv(entity, "stake_cost")
    curveReserve = getInv(entity, "curve_reserve")
    revenue = getInv(entity, "revenue")
    creds = getInv(entity, "creds")
  discard sk.drawText(sk.textStyle,
    fmt"Stakes: {totalStake}  Cost: {stakeCost}",
    sk.at, Yellow, clip = false)
  sk.advance(vec2(0, BarH + 4))
  discard sk.drawText(sk.textStyle,
    fmt"Revenue: {revenue}  Reserve: {curveReserve}",
    sk.at, White, clip = false)
  sk.advance(vec2(0, BarH + 4))
  discard sk.drawText(sk.textStyle,
    fmt"Creds pool: {creds}",
    sk.at, White, clip = false)
  sk.advance(vec2(0, BarH + 4))

proc findHub(): Entity =
  ## Find the first hub object on the grid.
  if replay.isNil:
    return nil
  for obj in replay.objects:
    if not obj.isNil and "hub" in normalizeTypeName(obj.typeName):
      if obj.alive.at:
        return obj
  return nil

proc drawStakeStationView(entity: Entity, isBuy: bool) =
  ## Stake buy/sell station display.
  let label = if isBuy: "Stake Buy" else: "Stake Sell"
  text(fmt"{label} Station")

  let hub = findHub()
  if hub.isNil:
    text("(no hub found)")
    return

  let
    totalStake = getInv(hub, "total_stake")
    stakeCost = getInv(hub, "stake_cost")
    k = 10
    sellPrice = k * totalStake
    buyPrice = stakeCost
  discard sk.drawText(sk.textStyle,
    fmt"Total stakes: {totalStake}",
    sk.at, Yellow, clip = false)
  sk.advance(vec2(0, BarH + 4))
  discard sk.drawText(sk.textStyle,
    fmt"Buy price:  {buyPrice}",
    sk.at, Green, clip = false)
  sk.advance(vec2(0, BarH + 4))
  discard sk.drawText(sk.textStyle,
    fmt"Sell price: {sellPrice}",
    sk.at, Red, clip = false)
  sk.advance(vec2(0, BarH + 4))

  let
    curveReserve = getInv(hub, "curve_reserve")
    creds = getInv(hub, "creds")
  discard sk.drawText(sk.textStyle,
    fmt"Reserve: {curveReserve}  Creds: {creds}",
    sk.at, White, clip = false)
  sk.advance(vec2(0, BarH + 4))

proc drawGearStationView(entity: Entity) =
  ## Gear station display: sold count, agent stats, cost.
  let tn = normalizeTypeName(entity.typeName)
  let gearName = tn.replace("_station", "")
  let displayName = gearName.replace("_", " ").toUpperAscii
  text(fmt"{displayName} Station")

  let sold = getInv(entity, "sold")
  discard sk.drawText(sk.textStyle,
    fmt"Total sold: {sold}",
    sk.at, Yellow, clip = false)
  sk.advance(vec2(0, BarH + 6))

  # Show first agent's gear level and upgrade cost.
  if replay.agents.len > 0:
    let agent = replay.agents[0]
    let gearVal = getInv(agent, gearName)
    let totalGear = getInv(agent, "core_a") +
      getInv(agent, "os_a") +
      getInv(agent, "gen_a") +
      getInv(agent, "storage_a") +
      getInv(agent, "core_d") +
      getInv(agent, "os_d") +
      getInv(agent, "gen_d") +
      getInv(agent, "storage_d")
    let cost = 1 shl (2 + totalGear)
    let creds = getInv(agent, "creds")
    let name = getCogName(agent.agentId)
    sk.advance(vec2(0, 4))
    discard sk.drawText(sk.textStyle,
      fmt"{name}",
      sk.at, White, clip = false)
    sk.advance(vec2(0, BarH + 4))
    discard sk.drawText(sk.textStyle,
      fmt"{gearName}: {gearVal}  gear: {totalGear}",
      sk.at, White, clip = false)
    sk.advance(vec2(0, BarH + 4))
    let costColor = if creds >= cost: Green else: Red
    discard sk.drawText(sk.textStyle,
      fmt"Cost: {cost}  Creds: {creds}",
      sk.at, costColor, clip = false)
    sk.advance(vec2(0, BarH + 4))

proc drawTrapView(entity: Entity) =
  ## Trap object display.
  text("Trap")
  let
    timeLeft = getInv(entity, "coherence")
    damage = getInv(entity, "core_a")
  colorBar("Time left", timeLeft, 5, Yellow)
  discard sk.drawText(sk.textStyle,
    fmt"Damage: {damage}",
    sk.at, Red, clip = false)
  sk.advance(vec2(0, BarH + 4))

proc drawGenericView(entity: Entity) =
  ## Fallback for unknown object types.
  text(fmt"{entity.typeName}")
  let coh = getInv(entity, "coherence")
  if coh > 0:
    colorBar("CO", coh, 100, Green)

proc drawEntityStats*(entity: Entity) =
  ## Draw stats for any entity, dispatching by type.
  if entity.isAgent:
    drawAgentView(entity)
    return
  let tn = normalizeTypeName(entity.typeName)
  if "extractor" in tn or tn == "junction":
    drawNodeView(entity)
  elif "market" in tn:
    drawMarketView(entity)
  elif "hub" in tn:
    drawHubView(entity)
  elif "stake_buy" in tn:
    drawStakeStationView(entity, true)
  elif "stake_sell" in tn:
    drawStakeStationView(entity, false)
  elif "_station" in tn and "market" notin tn and "stake" notin tn:
    drawGearStationView(entity)
  elif "trap" in tn:
    drawTrapView(entity)
  else:
    drawGenericView(entity)

import ../dropdown

const PolicyNames = ["noop", "random", "baseline"]

var policyDrop = DropState()
let policyOptions = @["noop", "random", "baseline"]

proc drawCoguePanel*(panel: Panel, frameId: string,
    contentPos: Vec2, contentSize: Vec2) =
  ## Draw the Cogue panel for the selected entity.
  frame(frameId, contentPos, contentSize):
    dropdownHeader(policyDrop, selectedPolicy)
    if replay.isNil or selected.isNil:
      text("No object selected")
    else:
      drawEntityStats(selected)
    let picked = dropdownMenu(policyDrop, policyOptions)
    if picked.len > 0:
      selectedPolicy = picked
      sendAction(0, "__policy__:" & picked)
