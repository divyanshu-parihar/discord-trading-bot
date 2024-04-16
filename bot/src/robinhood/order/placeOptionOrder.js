const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const {
  id_for_chain,
  get_option_expiration_dates_with_underlying_instruments,
  get_option_instrument_ids,
} = require("../helper");
const option = require("../../commands/option");
async function placeOptionsOrder(
  accountid,
  token,
  direction,
  instrumentid,
  side,
  price,
  quantity,
  time_in_force,
  trigger,
  type,
  ratio_quantity,
  position_effect
) {
  const option_data =
    await get_option_expiration_dates_with_underlying_instruments(
      "AAPL",
      accountid,
      token
    );
  console.log("option_data", option_data);
  let chain_id = option_data["results"][0]["id"];
  let stock_id =
    option_data["results"][0]["underlying_instruments"]["instrument"];

  const option_ids = await get_option_instrument_ids(
    token,
    accountid,
    chain_id,
    "2024-04-19",
    "buy",
    "active"
  );
  console.log(option_ids);
  return;
  const url = "https://api.robinhood.com/options/orders/";
  if (!token) throw Error("No Token Provided");
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  // return;

  const data = {
    account: "https://api.robinhood.com/accounts/" + accountid + "/",
    check_overrides: ["override_no_bid_price"],
    client_ask_at_submission: price,
    client_bid_at_submission: "0",
    direction: direction,
    form_source: "option_chain",
    legs: [
      {
        option: `https://api.robinhood.com/options/instruments/${instrumentid}/`,
        position_effect: position_effect,
        ratio_quantity: ratio_quantity,
        side: side,
      },
    ],
    override_day_trade_checks: false,
    price: price,
    quantity: quantity,
    ref_id: uuidv4(),
    time_in_force: time_in_force,
    trigger: trigger,
    type: type,
  };
  axios
    .post(url, data, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error placing order:", error);
      throw error;
    });
}

module.exports = placeOptionsOrder;
