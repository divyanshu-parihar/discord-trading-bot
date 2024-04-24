const axios = require("axios");

// 66227a79-cf57-459b-ae9e-21142d5d7413
async function cancelOptionOrder(token, orderId) {
  const config = {
    method: "post",
    url: `https://api.robinhood.com/options/orders/${orderId}/cancel/`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: {},
  };
  let result;
  await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      result = response.data;
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Response data:", error.response.data);

        throw Error(
          "order Id : " + orderId + "\n" + error.response.data.detail
        );
      } else {
        console.log("Error:", error.message);
        throw Error("Account Id : " + orderId + "\n" + error.message);
      }
    });

  return result;
}

module.exports = cancelOptionOrder;
