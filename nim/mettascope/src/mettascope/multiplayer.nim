## WebSocket multiplayer support for Emscripten builds.
import
  std/[json, strutils],
  common, replays, replayloader,
  gamemode/worldmap

when defined(emscripten):
  {.emit: """
  #include <emscripten.h>
  """.}

  {.emit: """
  EM_JS(void, mp_connect_ws_internal, (const char* url), {
    var wsUrl = UTF8ToString(url);
    console.log('Connecting to ' + wsUrl);
    window._mpWs = new WebSocket(wsUrl);
    window._mpWs.onopen = function() {
      console.log('WebSocket connected');
    };
    window._mpWs.onmessage = function(e) {
      var data = e.data;
      var len = lengthBytesUTF8(data) + 1;
      var ptr = _malloc(len);
      stringToUTF8(data, ptr, len);
      Module._mp_on_message(ptr, len - 1);
      _free(ptr);
    };
    window._mpWs.onerror = function(e) {
      console.error('WebSocket error', e);
    };
    window._mpWs.onclose = function() {
      console.log('WebSocket closed');
    };
  });
  """.}

  {.emit: """
  EM_JS(void, mp_send_ws_internal, (const char* msg), {
    if (window._mpWs && window._mpWs.readyState === 1) {
      window._mpWs.send(UTF8ToString(msg));
    }
  });
  """.}

  proc mpConnectWrapper(url: cstring) =
    ## Call the JavaScript WebSocket connector.
    {.emit: "mp_connect_ws_internal(`url`);".}

  proc mpSendWrapper(msg: cstring) =
    ## Call the JavaScript WebSocket sender.
    {.emit: "mp_send_ws_internal(`msg`);".}

proc mpConnect*(wsUrl: string) =
  ## Connect to the live game WebSocket server.
  multiplayerActive = true
  when defined(emscripten):
    mpConnectWrapper(wsUrl.cstring)
  else:
    echo "Multiplayer WebSocket is only supported in Emscripten builds."

proc mpSend*(msg: string) =
  ## Send a WebSocket text message.
  when defined(emscripten):
    mpSendWrapper(msg.cstring)

proc mpSendControl*(command: string, speed: float = 0.0) =
  ## Send playback control commands to the live game server.
  var msg = "{\"type\":\"control\",\"command\":\"" & command & "\""
  if command == "speed":
    msg.add(",\"speed\":" & $speed)
  msg.add("}")
  mpSend(msg)

var
  lastSentPlay = false
  lastSentSpeed = -1.0

proc mpSyncControls*() =
  ## Mirror local MettaScope transport controls to the server.
  if not multiplayerActive:
    return
  if play != lastSentPlay:
    mpSendControl(if play: "play" else: "stop")
    lastSentPlay = play
  if playSpeed != lastSentSpeed:
    mpSendControl("speed", playSpeed)
    lastSentSpeed = playSpeed

proc mpSendActions*() =
  ## Serialize and send queued actions.
  if not multiplayerActive:
    return
  if requestActions.len == 0:
    if requestMultiplayerFrame:
      mpSendControl("step")
    requestPython = false
    requestMultiplayerFrame = false
    return
  for action in requestActions:
    let msg =
      "{\"type\":\"action\",\"agent_id\":" &
      $action.agentId &
      ",\"action_name\":\"" &
      action.actionName & "\"}"
    mpSend(msg)
  if not play:
    mpSendControl("step")
  requestActions.setLen(0)
  requestPython = false
  requestMultiplayerFrame = false

proc mpOnAssign(data: string) =
  ## Handle an assign message from the server.
  let parsed = parseJson(data)
  multiplayerAgentId = parsed["agent_id"].getInt()
  let replayJson = $parsed["initial_replay"]
  playMode = Realtime
  play = false
  if parsed.hasKey("admin"):
    let admin = parsed["admin"]
    if admin.hasKey("playing"):
      play = admin["playing"].getBool()
    if admin.hasKey("speed"):
      playSpeed = admin["speed"].getFloat()
  lastSentPlay = play
  lastSentSpeed = playSpeed
  gameMode = Game
  common.replay = loadReplayString(replayJson, "multiplayer")
  onReplayLoaded()
  echo "Assigned agent ", multiplayerAgentId

proc selectAssignedAgent() =
  ## Select the assigned agent once it exists in the replay.
  if selected.isNil and multiplayerAgentId >= 0:
    selected = getAgentById(multiplayerAgentId)
    settings.lockFocus = true

proc mpOnStep(data: string) =
  ## Handle a live step message from the server.
  let parsed = parseJson(data)
  let stepNum = parsed["step"].getInt()
  common.replay.apply(data)
  step = stepNum
  stepFloat = stepNum.float32
  selectAssignedAgent()

proc mpOnWalls(data: string) =
  ## Handle one-time wall data from the server.
  common.replay.apply(data)
  resetTerrainCaches()
  rebuildSplats()

proc mpOnDone(data: string) =
  ## Handle game completion.
  echo "Game over"
  play = false

when defined(emscripten):
  proc mp_on_message(msgPtr: cstring, msgLen: cint)
      {.exportc, cdecl,
       codegenDecl:
         "EMSCRIPTEN_KEEPALIVE $# $#$#".} =
    ## Callback from JavaScript when a WebSocket text message arrives.
    let data = $msgPtr
    if data.len < 10:
      return
    if data.contains("\"assign\""):
      mpOnAssign(data)
    elif data.contains("\"walls\""):
      mpOnWalls(data)
    elif data.contains("\"step\""):
      mpOnStep(data)
    elif data.contains("\"done\""):
      mpOnDone(data)
