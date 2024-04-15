const axios = require("axios");
function placeOptionsOrder() {
  const url = "https://api.robinhood.com/options/orders/";

  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkY3QiOjE3MTI5NDQzMjIsImRldmljZV9oYXNoIjoiMzYwMWI2NjliMTBjZTI1YTUyNTYyZjYyODk4N2ZjYmMiLCJleHAiOjE3MTU2MTI3MDAsImxldmVsMl9hY2Nlc3MiOmZhbHNlLCJtZXRhIjp7Im9pZCI6ImM4MlNIMFdaT3NhYk9YR1Ayc3hxY2ozNEZ4a3ZmbldSWkJLbEJqRlMiLCJvbiI6IlJvYmluaG9vZCJ9LCJvcHRpb25zIjp0cnVlLCJwb3MiOiJwIiwic2NvcGUiOiJpbnRlcm5hbCIsInNlcnZpY2VfcmVjb3JkcyI6W3siaGFsdGVkIjpmYWxzZSwic2VydmljZSI6Im51bW11c191cyIsInNoYXJkX2lkIjoxLCJzdGF0ZSI6ImF2YWlsYWJsZSJ9LHsiaGFsdGVkIjpmYWxzZSwic2VydmljZSI6ImJyb2tlYmFja191cyIsInNoYXJkX2lkIjo0LCJzdGF0ZSI6ImF2YWlsYWJsZSJ9XSwic3JtIjp7ImIiOnsiaGwiOmZhbHNlLCJyIjoidXMiLCJzaWQiOjR9LCJuIjp7ImhsIjpmYWxzZSwiciI6InVzIiwic2lkIjoxfX0sInRva2VuIjoiR1p0N3M0NncxY3dwR01Dd3Z3Y2l4Ulg5UUtEZFRvIiwidXNlcl9pZCI6IjkwNGY4N2EwLWViZWMtNDI5Ni1hMjA3LTIyOTdjMzNhMTM2YiIsInVzZXJfb3JpZ2luIjoiVVMifQ.YiDQHkU9HGsgjlzA3QyKHwzQYYTvs0Qjh28N2hRn5jlyvAIUw8M-lftgzxfI5jccFxxTHq1QJZY1G7g1BXcFEZ43CtZqrSiqV678OE25lDorC8RGysu0Lie7YxZGUarsPhcxFCIiK7H9_P8mkJW38tpEQZ1_3sLT36K5iK0HphtREwWn1JJhadfl24jxY2gLkIe2k8tjxG0ji2aUEeXSHKDxOKgpof98O0DB3ebr_ZAFLZuMCzsLjhQnu38AoWNtqVrSzz9yi0CC-GNBocYi2_A5SGo60nZmCcIycZH3Ne9EoYDjKuwQF5TBzXvw3pd2Mm7er3yZ9n8obrrO7OW44Q",
    "Sec-Fetch-Site": "same-site",
    Host: "api.robinhood.com",
    Origin: "https://robinhood.com",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    Referer: "https://robinhood.com/",
    "Accept-Language": "en-IN,en-GB;q=0.9,en;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Sec-Fetch-Dest": "empty",
    "X-TimeZone-Id": "Asia/Calcutta",
    "X-Robinhood-API-Version": "1.431.4",
    "X-Hyper-Ex": "enabled",
  };

  const data = {
    account: "https://api.robinhood.com/accounts/799908983/",
    check_overrides: ["override_no_bid_price"],
    client_ask_at_submission: "0.01",
    client_bid_at_submission: "0",
    direction: "debit",
    form_source: "option_chain",
    legs: [
      {
        option:
          "https://api.robinhood.com/options/instruments/6b63cacd-b5ba-4af5-841b-684bdb60e9bd/",
        position_effect: "open",
        ratio_quantity: 1,
        side: "buy",
      },
    ],
    override_day_trade_checks: false,
    price: "0.01",
    quantity: "1",
    ref_id: "eeb8af34-c358-41ba-adb5-aqwefqwef6f9cf6e4616",
    time_in_force: "gfd",
    trigger: "immediate",
    type: "limit",
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
