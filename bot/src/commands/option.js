const placeOptionsOrder = require("bot/src/robinhood/order/placeOptionOrder.js");
const getChannel = require("../helper/getChannel");
const prisma = require("../db");
const memberRole = require("../helper/checkRole");
module.exports = {
  name: "option",
  description: "Used to buy options Usage: !option symbol expiration_date  ",
  execute: async (client, message, ...args) => {
    if (!memberRole(message, "OPTION_EXPERT"))
      return message.reply("Not enough Perms");
    if (args.length != 8) return message.reply("Not all args provided");
    const channel = getChannel(client, message);
    const startTime = process.hrtime();
    await channel.send(
      "Trying to purchase:" + args[2] + " quantity one with your access token."
    );
    const userTokenData = await prisma.userRobinhoodTokens.findUnique({
      where: {
        authorId: message.author.id,
      },
    });
    if (!userTokenData)
      return message.reply(
        "You haven't setup your account. use !sub <account id> <access_token> "
      );
    try {
      const result = await placeOptionsOrder(
        "799908983",
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkY3QiOjE3MTI5NDQzMjIsImRldmljZV9oYXNoIjoiMzYwMWI2NjliMTBjZTI1YTUyNTYyZjYyODk4N2ZjYmMiLCJleHAiOjE3MTU2MTI3MDAsImxldmVsMl9hY2Nlc3MiOmZhbHNlLCJtZXRhIjp7Im9pZCI6ImM4MlNIMFdaT3NhYk9YR1Ayc3hxY2ozNEZ4a3ZmbldSWkJLbEJqRlMiLCJvbiI6IlJvYmluaG9vZCJ9LCJvcHRpb25zIjp0cnVlLCJwb3MiOiJwIiwic2NvcGUiOiJpbnRlcm5hbCIsInNlcnZpY2VfcmVjb3JkcyI6W3siaGFsdGVkIjpmYWxzZSwic2VydmljZSI6Im51bW11c191cyIsInNoYXJkX2lkIjoxLCJzdGF0ZSI6ImF2YWlsYWJsZSJ9LHsiaGFsdGVkIjpmYWxzZSwic2VydmljZSI6ImJyb2tlYmFja191cyIsInNoYXJkX2lkIjo0LCJzdGF0ZSI6ImF2YWlsYWJsZSJ9XSwic3JtIjp7ImIiOnsiaGwiOmZhbHNlLCJyIjoidXMiLCJzaWQiOjR9LCJuIjp7ImhsIjpmYWxzZSwiciI6InVzIiwic2lkIjoxfX0sInRva2VuIjoiR1p0N3M0NncxY3dwR01Dd3Z3Y2l4Ulg5UUtEZFRvIiwidXNlcl9pZCI6IjkwNGY4N2EwLWViZWMtNDI5Ni1hMjA3LTIyOTdjMzNhMTM2YiIsInVzZXJfb3JpZ2luIjoiVVMifQ.YiDQHkU9HGsgjlzA3QyKHwzQYYTvs0Qjh28N2hRn5jlyvAIUw8M-lftgzxfI5jccFxxTHq1QJZY1G7g1BXcFEZ43CtZqrSiqV678OE25lDorC8RGysu0Lie7YxZGUarsPhcxFCIiK7H9_P8mkJW38tpEQZ1_3sLT36K5iK0HphtREwWn1JJhadfl24jxY2gLkIe2k8tjxG0ji2aUEeXSHKDxOKgpof98O0DB3ebr_ZAFLZuMCzsLjhQnu38AoWNtqVrSzz9yi0CC-GNBocYi2_A5SGo60nZmCcIycZH3Ne9EoYDjKuwQF5TBzXvw3pd2Mm7er3yZ9n8obrrO7OW44Q",
        args[0], // symbol
        args[7], // direction
        args[2],
        args[3], // side
        args[5], // price
        args[6], // quantity
        "gfd", //  time in force
        "immediate", //trigger
        "limit", // type
        "1", // ration quantity
        args[4], // position_effect
        args[1] // expiration date
      );
      console.log("result", result);
      const endTime = process.hrtime(startTime);
      const executionTimeInMs = endTime[0] * 1000 + endTime[1] / 1000000;
      await channel.send(
        "Order Placed Success full. Please check console. It took " +
          executionTimeInMs / 1000 +
          "seconds"
      );
    } catch (e) {
      console.log(e.message);
      await channel.send(
        "Wasn't able to place order." + "\n" + "REASON : " + e.message
      );
    }
  },
};
