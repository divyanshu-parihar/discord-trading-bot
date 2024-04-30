const axios = require("axios");
const accountInfo = async (token) => {
  const options = {
    method: "GET",
    url: "https://api.robinhood.com/user/",
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
  return result;
};
module.exports = accountInfo;
