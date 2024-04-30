const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const {
  get_option_expiration_dates_with_underlying_instruments,
  get_option_instrument_ids,
} = require("../helper");
// const option = require("../../commands/option");
async function placeOptionsOrder(
  accountid,
  token,
  symbol,
  direction,
  strike_price,
  side,
  price,
  quantity,
  time_in_force,
  trigger,
  type,
  ratio_quantity,
  position_effect,
  expiration_date,

  chain_type = "call"
) {
  // console.log("account id", accountid);
  // console.log("symbol", symbol);
  // console.log("dir", direction);
  // console.log("side", side);
  // console.log("price", price);
  // console.log("quantiy", quantity);
  // console.log("time in force", time_in_force);
  // console.log("trigger", trigger);
  // console.log("type", type);
  // console.log("ratio", ratio_quantity);
  // console.log("position", position_effect);
  // console.log("expiration date", expiration_date);

  const option_data =
    await get_option_expiration_dates_with_underlying_instruments(
      symbol,
      accountid,
      token
    );
  const expiration_dates = option_data["results"][0]["expiration_dates"];
  // console.log(expiration_dates);
  // console.log(expiration_date);
  if (!expiration_dates)
    throw Error("Could not Fetch Expiration Dates for that symbol");
  if (expiration_dates && !expiration_dates.includes(expiration_date))
    throw Error("Invalid Expiration Date");

  let chain_id = option_data["results"][0]["id"];
  // console.log("chain id ", chain_id);

  const option_ids = await get_option_instrument_ids(
    token,
    accountid,
    chain_id,
    expiration_date,
    chain_type,
    "active"
  );
  // console.log("direction", direction);
  if (!option_ids) throw Error("Could not fetch option instruments.");
  // console.log("option ids", option_ids);
  const url = "https://api.robinhood.com/options/orders/";
  if (!token) throw Error("No Token Provided");
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  // return;
  const instrument = option_ids["results"].filter(
    (el) => el.strike_price == strike_price
  );
  // console.log("instrument", instrument[0]["url"]);
  const data = {
    account: "https://api.robinhood.com/accounts/" + accountid + "/",
    check_overrides: ["override_no_bid_price"],
    client_ask_at_submission: price,
    client_bid_at_submission: "0",
    direction: direction,
    form_source: "option_chain",
    legs: [
      {
        option: instrument[0]["url"],
        position_effect: position_effect,
        ratio_quantity: ratio_quantity,
        side: side,
      },
    ],
    override_day_trade_checks: false,
    price: price,
    quantity: 1,
    ref_id: uuidv4(),
    time_in_force: time_in_force,
    trigger: trigger,
    type: type,
  };
  let result;
  await axios
    .post(url, data, { headers })
    .then((response) => {
      console.log(response.data);
      result = response.data;
    })
    .catch((error) => {
      // console.log(error.response.data);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Response data:", error.response.data);

        throw Error(error.response.data.detail);
      } else {
        console.log("Error:", error.message);
        throw Error(error.message);
      }
    });

  return result;
}

module.exports = placeOptionsOrder;
