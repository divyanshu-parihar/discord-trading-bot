const prisma = require("../db");
const accountInfo = require("../robinhood/user/account_info");

module.exports = {
  name: "current",
  description: "Get Information about your account",
  execute: async (client, message, args) => {
    let userTokenData = await prisma.userRobinhoodTokens.findUnique({
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
      const info = await accountInfo(userTokenData.token);
      console.log(info);
      return await message.reply(
        "You are currently Logged in as " +
          info.first_name +
          " " +
          info.last_name +
          "!\n" +
          "with email : " +
          info.email
      );
    } catch (e) {}
  },
};
