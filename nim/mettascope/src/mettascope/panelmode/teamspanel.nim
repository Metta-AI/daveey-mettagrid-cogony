## Teams panel: teams as columns, stats as rows.
import
  std/[strformat, strutils],
  vmath, chroma, silky, windy,
  ../common, ../replays, ../cognames,
  coguepanel

const
  LblX = 0.0f
  Col0 = 90.0f
  ColW = 55.0f
  RowH = BarH + 14
  SectionGap = 14.0f
  LineColor = rgbx(50, 55, 65, 255)
  BoldWhite = rgbx(240, 240, 240, 255)

proc hline(x0, y, width: float32) =
  ## Draw a thin horizontal divider.
  sk.drawRect(vec2(x0, y), vec2(width, 1), LineColor)

proc drawTeamsPanel*(panel: Panel, frameId: string,
    contentPos: Vec2, contentSize: Vec2) =
  frame(frameId, contentPos, contentSize):
    if replay.isNil:
      text("No replay loaded")
      return

    const TeamInfo = [
      ("red", TeamRed),
      ("blue", TeamBlue),
      ("green", TeamGreen),
      ("yellow", TeamYellow),
    ]

    let x0 = sk.at.x
    let tableW = Col0 + 5.0f * ColW

    # Gather all team data.
    type TeamData = object
      members, totalStake, stakeCost, creds, junctions, revenue: int
      championStake: int
      champion: Entity
      myStake, myInvested, myDividends: int
      myStaked, myProfit: int

    var td: array[4, TeamData]
    for i in 0 ..< 4:
      let teamTag = "team:cogs_" & TeamInfo[i][0]
      for obj in replay.objects:
        if obj.typeName == "hub":
          if replay.entityHasTag(obj, teamTag, step):
            td[i].totalStake = getInv(obj, "total_stake")
            td[i].stakeCost = getInv(obj, "stake_cost")
            td[i].creds = getInv(obj, "creds")
            td[i].revenue = getInv(obj, "revenue")
            break
      for obj in replay.agents:
        if replay.entityHasTag(obj, teamTag, step):
          td[i].members += 1
      for obj in replay.objects:
        if obj.typeName == "junction":
          if replay.entityHasTag(obj, teamTag, step):
            td[i].junctions += 1
      let stakeRes = TeamInfo[i][0] & "_stake"
      for obj in replay.agents:
        let s = getInv(obj, stakeRes)
        if s > td[i].championStake:
          td[i].championStake = s
          td[i].champion = obj
      if not selected.isNil and selected.isAgent:
        td[i].myStake = getInv(selected, TeamInfo[i][0] & "_stake")
        td[i].myInvested = getInv(selected, TeamInfo[i][0] & "_invested")
        td[i].myDividends = getInv(selected, TeamInfo[i][0] & "_dividends")
        let q = td[i].myStake
        let s = td[i].totalStake
        let kBase = if s >= 0:
            td[i].stakeCost div (s + 1)
          else:
            10
        td[i].myStaked = kBase * (q * s - q * (q - 1) div 2)
        td[i].myProfit = td[i].myDividends + td[i].myStaked - td[i].myInvested

    let mineX = x0 + Col0 + 4.0f * ColW

    # === SECTION: TEAMS ===
    sk.advance(vec2(0, 4))
    discard sk.drawText("pixelated", "TEAMS",
      sk.at, Yellow, clip = false)
    sk.advance(vec2(0, RowH + 4))

    # Column headers.
    hline(x0, sk.at.y - 2, tableW)
    sk.advance(vec2(0, 4))
    let hy = sk.at.y
    for i in 0 ..< 4:
      let cx = x0 + Col0 + i.float32 * ColW
      sk.drawRect(vec2(cx + 2, hy + 4), vec2(8, 8), TeamInfo[i][1])
      discard sk.drawText(sk.textStyle,
        TeamInfo[i][0][0 ..< 1].toUpperAscii,
        vec2(cx + 14, hy), TeamInfo[i][1], clip = false)
    discard sk.drawText(sk.textStyle, "mine",
      vec2(mineX, hy), Yellow, clip = false)
    sk.advance(vec2(0, RowH))
    hline(x0, sk.at.y - 4, tableW)
    sk.advance(vec2(0, 4))

    # Stat row helper.
    proc statRow(label: string, getter: proc(i: int): int,
        myGetter: proc(i: int): int = nil,
        labelColor: ColorRGBX = Grey,
        valueColor: ColorRGBX = White) =
      let y = sk.at.y
      discard sk.drawText(sk.textStyle, label,
        vec2(x0 + LblX, y), labelColor, clip = false)
      for i in 0 ..< 4:
        let cx = x0 + Col0 + i.float32 * ColW
        discard sk.drawText(sk.textStyle, $getter(i),
          vec2(cx, y), valueColor, clip = false)
      if myGetter != nil:
        let total = myGetter(0) + myGetter(1) + myGetter(2) + myGetter(3)
        if total != 0:
          let c = if total > 0: Green else: Red
          discard sk.drawText(sk.textStyle, $total,
            vec2(mineX, y), c, clip = false)
      sk.advance(vec2(0, RowH))

    statRow("members", proc(i: int): int = td[i].members)
    statRow("stakes",  proc(i: int): int = td[i].totalStake,
                       proc(i: int): int = td[i].myStake)
    statRow("creds",   proc(i: int): int = td[i].creds)
    statRow("jnc",     proc(i: int): int = td[i].junctions)
    statRow("revenue", proc(i: int): int = td[i].revenue)

    # Champion row: show name of top staker per team.
    block:
      let y = sk.at.y
      discard sk.drawText(sk.textStyle, "champ",
        vec2(x0 + LblX, y), Grey, clip = false)
      var isChampAny = false
      for i in 0 ..< 4:
        let cx = x0 + Col0 + i.float32 * ColW
        if not td[i].champion.isNil:
          let name = getCogName(td[i].champion.agentId)
          discard sk.drawText(sk.textStyle, name,
            vec2(cx, y), Yellow, clip = false)
          if not selected.isNil and selected.isAgent:
            if td[i].champion.id == selected.id:
              isChampAny = true
        else:
          discard sk.drawText(sk.textStyle, "-",
            vec2(cx, y), Grey, clip = false)
      if isChampAny:
        discard sk.drawText(sk.textStyle, "\xe2\x98\x85",
          vec2(mineX, y), Yellow, clip = false)
      sk.advance(vec2(0, RowH))

    sk.advance(vec2(0, SectionGap))

    # === SECTION: MY PORTFOLIO ===
    if selected.isNil or not selected.isAgent:
      return

    hline(x0, sk.at.y, tableW)
    sk.advance(vec2(0, SectionGap))
    discard sk.drawText("pixelated", "MY PORTFOLIO",
      sk.at, Yellow, clip = false)
    sk.advance(vec2(0, RowH + 4))
    hline(x0, sk.at.y - 4, tableW)
    sk.advance(vec2(0, 4))

    statRow("stake",    proc(i: int): int = td[i].myStake)
    statRow("invested", proc(i: int): int = td[i].myInvested)
    statRow("received", proc(i: int): int = td[i].myDividends)
    statRow("staked",   proc(i: int): int = td[i].myStaked)
    hline(x0, sk.at.y - 4, tableW)
    sk.advance(vec2(0, 2))
    statRow("profit",   proc(i: int): int = td[i].myProfit,
            labelColor = BoldWhite, valueColor = BoldWhite)
