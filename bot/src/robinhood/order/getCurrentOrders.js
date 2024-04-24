const axios = require("axios");
async function getCurrentOrder(token, accountIds) {
  const options = {
    method: "GET",
    url: "https://api.robinhood.com/options/orders/",
    params: {
      account_numbers: accountIds,
      page_size: "100",
      state: "queued",
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  let result;
  await axios(options)
    .then((response) => {
      // console.log(response);
      result = response.data;
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Response data:", error);

        throw Error(error.response.data.detail);
      } else {
        console.log("Error:", error.message);
        throw Error(error.message);
      }
    });

  return result;
}
module.exports = getCurrentOrder;
