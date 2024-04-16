const axios = require("axios");
const getOptionId = (symbol, expirationDate, strike, optionType) => {
  symbol = toString(symbol).toUpperCase();
  chain_id = id_for_chain(symbol);
  payload = {
    chain_id: chain_id,
    expiration_dates: expirationDate,
    strike_price: strike,
    type: optionType,
    state: "active",
  };
  url = "https://api.robinhood.com/options/instruments/";
};

async function get_option_expiration_dates_with_underlying_instruments(
  symbol,
  accountid,
  token
) {
  const headers = {
    Authorization: "Bearer " + token,
  };

  let result;
  await axios
    .get(
      "https://api.robinhood.com/options/chains/?account_number=" +
        accountid +
        "&equity_symbol=" +
        symbol,
      { headers }
    )
    .then((response) => {
      result = response.data;
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
  return result;
}
async function get_option_instrument_ids(
  token,
  accountid,
  chain_id,
  expiration_dates,
  type,
  state = "active"
) {
  const headers = {
    Authorization: "Bearer " + token,
  };
  let result;
  await axios
    .get(
      `https://api.robinhood.com/options/instruments/?account_number=${accountid}&chain_id=${chain_id}&expiration_dates=${expiration_dates}&state=${state}&type=${type}`,
      { headers }
    )
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
  return result;
}
module.exports = {
  getOptionId,
  get_option_expiration_dates_with_underlying_instruments,
  get_option_instrument_ids,
};
