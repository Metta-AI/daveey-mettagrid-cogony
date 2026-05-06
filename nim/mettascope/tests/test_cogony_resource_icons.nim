import mettascope/gamemode/custom_hud

block cogony_stake_price_resource_icons:
  doAssert resourceIconName("blue_stake_buy_price") == "creds"
  doAssert resourceIconName("blue_stake_sell_price") == "creds"
  doAssert resourceIconName("blue_total_stakes") == "star"
  doAssert resourceIconName("creds") == "creds"

echo "cogony resource icon aliases ok"
