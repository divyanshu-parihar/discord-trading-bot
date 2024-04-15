const { Client, Events, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("node:path");
const axios = require("axios");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on(Events.MessageCreate, (message) => {
  // console.log(message);
  const content = message.content;
  if (message.author.bot) return;
  if (!content.startsWith("!")) return;
  const args = message.content.split(" ");
  if (
    fs.existsSync(path.join(__dirname, "commands", args[0].slice(1) + ".js"))
  ) {
    const command = require(path.join(
      __dirname,
      "commands",
      args[0].slice(1) + ".js"
    ));
    command.execute(client, message, [...args.slice(1)]);
    console.log("command executed");
  }
});
client.once(Events.ClientReady, (ready) => {
  console.log(`Ready! Logged in as ${ready.user.tag}`);
});

// Log in to Discord with your client's token
client.login(
  "MTIyODcwMjkxODE0NDY5MjI4NQ.G_-4M9.Yi1dnemYJ2xy7PXCfyb5Xn-teI0IC2Nr_ecIh4"
);
