const prisma = require("../db");
const getChannel = require("../helper/getChannel");
const { execute } = require("./hello");

module.exports = {
  name: "set",
  description: "change the token",
  execute: async (client, message, args) => {
    console.log(args);
    if (!args || args.length != 2) return;
    // prisma adding if not done
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
    const channel = getChannel(client, message);
    if (channel)
      channel.send(
        `Successfully set <@${query.authorId}> Robinhood token to : ${query.token} with account id ${query.accountId}`
      );
  },
};
