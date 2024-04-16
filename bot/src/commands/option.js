const placeOptionsOrder = require("../robinhood/order/placeOptionOrder");
const getChannel = require("../helper/getChannel");
const prisma = require("../db");
module.exports = {
  name: "option",
  description: "Used to buy options",
  execute: async (client, message, ...args) => {
    const channel = getChannel(client, message);
    // const accountid = args[0];
    const startTime = process.hrtime();
    await channel.send(
      "Trying to purchase APPL quantity one with your access token."
    );
    const userTokenData = await prisma.userRobinhoodTokens.findUnique({
      where: {
        authorId: message.author.id,
      },
    });

    try {
      const result = await placeOptionsOrder(
        userTokenData.accountId,
        userTokenData.token,
        "debit",
        "6b63cacd-b5ba-4af5-841b-684bdb60e9bd",
        "buy",
        "0.01",
        1,
        "gfd",
        "immediate",
        "limit",
        "1",
        "open"
      );
      console.log(result);
      const endTime = process.hrtime(startTime);
      const executionTimeInMs = endTime[0] * 1000 + endTime[1] / 1000000;
      await channel.send(
        "Order Placed Success full. Please check console. It took " +
          executionTimeInMs +
          "ms"
      );
    } catch (e) {
      console.log(e);
      await channel.send(
        "Unable to place order. please check your credentials"
      );
    }
  },
};
