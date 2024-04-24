const prisma = require("../db");
const getChannel = require("../helper/getChannel");
const placeOrder = require("../robinhood/order/placeOrderStocks");
module.exports = {
  name: "hello",
  description: "Initial command",
  execute: async (client, message, ...args) => {
    const channel = getChannel(client, message);

    const startTime = process.hrtime();
    await channel.send(
      "Trying to purchase APPL quantity one with your access token."
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
      await placeOrder(
        userTokenData.token,
        userTokenData.accountId,
        "450dfc6d-5510-4d40-abfb-f633b7d9be3e",
        "AAPL",
        "0.01",
        "limit",
        "immediate",
        1,
        "buy",
        "gfd"
      );
      const endTime = process.hrtime(startTime);
      const executionTimeInMs = endTime[0] * 1000 + endTime[1] / 1000000;
      await channel.send(
        "Order Placed Success full. Please check console. It took " +
          executionTimeInMs +
          "ms"
      );
    } catch (e) {
      await channel.send("Unable to place order.");
    }
  },
};
