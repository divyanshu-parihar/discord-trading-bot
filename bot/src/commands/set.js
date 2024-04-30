const prisma = require("../db");
const getChannel = require("../helper/getChannel");
const {
  ActionRowBuilder,
  Events,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const accounts = require("../robinhood/user/accounts");
module.exports = {
  name: "set",
  description: "change the token",
  execute: async (client, message, ...args) => {
    const channel = getChannel(client, message);
    if (!message.channel.isDMBased) {
      return await channel.send("Only DM Command");
    }
    // args = args.map((el) => el != "");
    console.log(args);
    if (!args || args.length != 1)
      return message.reply("Please provide correct values.");
    // prisma adding if not done
    // try {
    //   await message.delete();
    // } catch (e) {
    //   await message.reply(
    //     "I do not have permission to delete your message please Delete your message yourself."
    //   );
    // }
    const accountId = await accounts(args[0]);
    console.log(accountId);
    const query = await prisma.userRobinhoodTokens.upsert({
      where: {
        authorId: message.author.id,
      },
      update: {
        token: args[0],
      },
      create: {
        authorId: message.author.id,
        token: args[0],
        accountId: accountId,
      },
    });
    // console.log(query);
    if (channel && query)
      await channel.send(
        `Successfully set <@${query.authorId}> Robinhood token to with account id ${query.accountId}`
      );
  },
};
