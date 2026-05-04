## Target panel: displays the last interaction target of the selected entity.
import
  std/[strformat],
  vmath, chroma, silky, windy,
  ../common, ../replays, ../cognames,
  coguepanel

const
  DirMap = {
    "move_north": ivec2(0, -1),
    "move_south": ivec2(0, 1),
    "move_east": ivec2(1, 0),
    "move_west": ivec2(-1, 0),
  }

proc findLastTarget*(entity: Entity, atStep: int = step): Entity =
  ## Find the last entity this one interacted with (bumped).
  if entity.isNil or not entity.isAgent:
    return nil
  var s = atStep
  while s >= 0:
    if s >= entity.actionId.len:
      dec s
      continue
    let actId = entity.actionId.at(s)
    if actId < 0 or actId >= replay.actionNames.len:
      dec s
      continue
    let actName = replay.actionNames[actId]
    var bumpDir = ivec2(0, 0)
    for pair in DirMap:
      if pair[0] == actName:
        bumpDir = pair[1]
        break
    if bumpDir == ivec2(0, 0):
      dec s
      continue
    let
      myPos = entity.location.at(s)
      nextPos = entity.location.at(min(s + 1, entity.location.len - 1))
    if myPos == nextPos:
      let targetPos = myPos + bumpDir
      let target = getObjectAtLocation(targetPos, s)
      if not target.isNil and target.id != entity.id:
        return target
    dec s
  return nil

proc drawDamagePreview(attacker, defender: Entity) =
  ## Show expected damage dealt and received for a hypothetical attack.
  const Channels = [
    ("Core", "core_a", "core_d"),
    ("OS", "os_a", "os_d"),
    ("Gen", "gen_a", "gen_d"),
    ("Stor", "storage_a", "storage_d"),
  ]
  var totalDealt = 0
  var totalReceived = 0

  sk.advance(vec2(0, 4))
  discard sk.drawText(sk.textStyle, "-- Combat Preview --",
    sk.at, Yellow, clip = false)
  sk.advance(vec2(0, BarH + 4))

  # Header row.
  let col1 = sk.at.x + LabelW
  let col2 = col1 + 60
  discard sk.drawText(sk.textStyle, "Deal",
    vec2(col1, sk.at.y), Red, clip = false)
  discard sk.drawText(sk.textStyle, "Take",
    vec2(col2, sk.at.y), Blue, clip = false)
  sk.advance(vec2(0, BarH + 2))

  for ch in Channels:
    let
      myAtk = getInv(attacker, ch[1])
      theirDef = getInv(defender, ch[2])
      dealt = max(0, myAtk - theirDef)
      theirAtk = getInv(defender, ch[1])
      myDef = getInv(attacker, ch[2])
      received = max(0, theirAtk - myDef)
    totalDealt += dealt
    totalReceived += received
    let y = sk.at.y
    discard sk.drawText(sk.textStyle, ch[0],
      vec2(sk.at.x, y), White, clip = false)
    let dealColor = if dealt > 0: Red else: DarkGrey
    discard sk.drawText(sk.textStyle, $dealt,
      vec2(col1, y), dealColor, clip = false)
    let takeColor = if received > 0: Blue else: DarkGrey
    discard sk.drawText(sk.textStyle, $received,
      vec2(col2, y), takeColor, clip = false)
    sk.advance(vec2(0, BarH + 2))

  # Totals.
  let y = sk.at.y
  discard sk.drawText(sk.textStyle, "Total",
    vec2(sk.at.x, y), Yellow, clip = false)
  discard sk.drawText(sk.textStyle, $totalDealt,
    vec2(col1, y), Red, clip = false)
  discard sk.drawText(sk.textStyle, $totalReceived,
    vec2(col2, y), Blue, clip = false)
  sk.advance(vec2(0, BarH + 4))

  # Kills-in calculation.
  let targetCoh = getInv(defender, "coherence")
  if totalDealt > 0 and targetCoh > 0:
    let hitsToKill = (targetCoh + totalDealt - 1) div totalDealt
    discard sk.drawText(sk.textStyle,
      fmt"Kill in {hitsToKill} hits",
      sk.at, Green, clip = false)
    sk.advance(vec2(0, BarH + 2))

  let myCoh = getInv(attacker, "coherence")
  if totalReceived > 0 and myCoh > 0:
    let hitsToDie = (myCoh + totalReceived - 1) div totalReceived
    discard sk.drawText(sk.textStyle,
      fmt"Die in {hitsToDie} hits",
      sk.at, Red, clip = false)
    sk.advance(vec2(0, BarH + 2))

proc drawTargetPanel*(panel: Panel, frameId: string,
    contentPos: Vec2, contentSize: Vec2) =
  ## Draw stats for the selected entity's last interaction target.
  frame(frameId, contentPos, contentSize):
    if replay.isNil or selected.isNil:
      text("No object selected")
      return

    let target = findLastTarget(selected)
    if target.isNil:
      text("No target")
      return

    text("-- Target --")
    drawEntityStats(target)

    if selected.isAgent:
      drawDamagePreview(selected, target)
