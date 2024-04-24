const prisma = require("../db");

module.exports = {
  name: "subCommand",
  description: "Sub React Message",

  execute: async (client, message, ...arg) => {
    if (arg.length != 1) return message.reply("No Channel provided");
    const subChannel = arg[0];
    try {
      await prisma[subChannel].create({
        data: {
          userid: message.author.id,
        },
      });
      await message.reply("WOOOAAA!!! You have subscribed to " + subChannel);
    } catch (e) {
      await message.reply(
        "Export not found. Please check for spelling errors."
      );
    }
  },
};
