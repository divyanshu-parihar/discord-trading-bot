const { expertRole } = require("../config");
const prisma = require("../db");
const memberRole = require("../helper/checkRole");
const getBalance = require("../robinhood/user/balance");

module.exports = {
  name: "Balance",
  description: "Balance of the user. Usage : !balance",
  execute: async (client, message, args) => {
    let userTokenData;
    // console.log(args);
    // console.log(args && !memberRole(message, expertRole));
    if (args && !memberRole(message, expertRole)) {
      userTokenData = await prisma.userRobinhoodTokens.findUnique({
        where: {
          authorId: args[0],
        },
      });
      console.log("user tokens", userTokenData);
    } else
      userTokenData = await prisma.userRobinhoodTokens.findUnique({
        where: {
          authorId: message.author.id,
        },
      });

    if (!userTokenData) {
      return await message.reply(
        "You don't have any token set. Please use !set <access_token>."
      );
    }
    try {
      const balanceInfo = await getBalance(
        userTokenData.accountId,
        userTokenData.token
      );
      let balance = ``;

      for (const el of balanceInfo) {
        balance += el.title + " ";
        balance += el.value + "\n";
      }

      await message.reply(`You Balance :\n${balance}`);
    } catch (e) {
      return await message.reply("Could not send the message.");
    }
  },
};
