const axios = require("axios");
const getBalance = async (accountId, token) => {
  const options = {
    method: "GET",
    url:
      "https://bonfire.robinhood.com/accounts/" +
      accountId +
      "/withdrawable_amount_breakdown",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  let result;
  await axios(options)
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log("Response data:", error);

        throw Error(error.response.data.detail);
      } else {
        console.log("Error:", error.message);
        throw Error(error.message);
      }
    });
  // console.log(result);
  return result["breakdown_items"];
};
module.exports = getBalance;
