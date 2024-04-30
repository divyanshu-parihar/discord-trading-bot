const axios = require("axios");
const accounts = async (token) => {
  const options = {
    method: "GET",
    url: "https://nummus.robinhood.com/accounts/",
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
        console.log("Response data:", error);

        throw Error(error.response.data.detail);
      } else {
        console.log("Error:", error.message);
        throw Error(error.message);
      }
    });
  console.log(result);
  return result["results"][0]["apex_account_number"];
};
module.exports = accounts;
