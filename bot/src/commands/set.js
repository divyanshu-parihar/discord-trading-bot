const prisma = require("../db");
const getChannel = require("../helper/getChannel");
module.exports = {
  name: "set",
  description: "change the token",
  execute: async (client, message, ...args) => {
    const channel = getChannel(client, message);
    console.log(args);
    if (!args || args.length != 2)
      return message.reply("Please provide correct values.");
    // prisma adding if not done
    try {
      await message.delete();
    } catch (e) {
      await message.reply(
        "I do not have permission to delete your message please Delete your message yourself."
      );
    }
    const query = await prisma.userRobinhoodTokens.upsert({
      where: {
        authorId: message.author.id,
      },
      update: {
        token: args[0],
      },
      create: {
        authorId: message.author.id,
        token: args[1],
        accountId: args[0],
      },
    });

    if (channel)
      await channel.send(
        `Successfully set <@${query.authorId}> Robinhood token to with account id ${query.accountId}`
      );
  },
};
