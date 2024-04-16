const axios = require("axios");

const placeOrder = async (
  token,
  accountId,
  instrumentId,
  symbol,
  price,
  type,
  trigger,
  quantity,
  side,
  time_in_force
) => {
  const headers = {
    Authorization: "Bearer " + token,
  };

  const orderPayload = {
    account: `https://api.robinhood.com/accounts/${accountId}/`,
    instrument: `https://api.robinhood.com/instruments/${instrumentId}/`,
    quantity: quantity,
    price: price,
    side: side,
    type: type,
    time_in_force: time_in_force,
    trigger: trigger,
    symbol: symbol,
  };

  const orderUrl = "https://api.robinhood.com/orders/";

  axios
    .post(orderUrl, orderPayload, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error placing order:", error);
      throw error;
    });
};
module.exports = placeOrder;
