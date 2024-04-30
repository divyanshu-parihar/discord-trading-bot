const getChannel = require("../helper/getChannel");
const placeOptionsOrder = require("../robinhood/order/placeOptionOrder");
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
        userTokenData.accountId,
        userTokenData.token,
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

      if (e.response.data == "token revoked") {
        await channel.send(
          "[TOKEN REVOKED] : SOLUTION: Please update your token."
        );
      } else {
        await channel.send(
          "Wasn't able to place order." + "\n" + "REASON : " + e.message
        );
      }
    }
  },
};
