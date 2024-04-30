const {
  Client,
  Events,
  GatewayIntentBits,
  Partials,
  ApplicationCommandType,
  Collection,
  EmbedBuilder,
} = require("discord.js");

const fs = require("fs");
const path = require("node:path");
const prisma = require("./db");
const cancelOptionOrder = require("./robinhood/order/cancelOptionOrder");
const getCurrentOrder = require("./robinhood/order/getCurrentOrders");
const getChannel = require("./helper/getChannel");
const { channel } = require("diagnostics_channel");
const handleError = require("./util/handleError");
const { orderRetries } = require("./config");
const placeOptionsOrder = require("./robinhood/order/placeOptionOrder");
const newExpertOrders = require("./cron/newExpertOrders");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Channel,
    Partials.Reaction,
  ],
});
client.commands = new Collection();
// client.on("messageCreate", (message) => {
//   const content = message.content;
//   if (message.author.bot) return;
//   if (!content.startsWith("!")) return;
//   const args = message.content.split(" ");
//   if (
//     fs.existsSync(path.join(__dirname, "commands", args[0].slice(1) + ".js"))
//   ) {
//     const command = require(path.join(
//       __dirname,
//       "commands",
//       args[0].slice(1) + ".js"
//     ));
//     args.shift();
//     // args.shift();
//     command.execute(client, message, ...args);
//     console.log("command executed");
//   }
// });
client.once(Events.ClientReady, (ready) => {
  console.log(`Ready! Logged in as ${ready.user.tag}`);
});
// client.on(Events.InteractionCreate, async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   const command = interaction.client.commands.get(interaction.commandName);
//   console.log(command);
//   if (!command) {
//     console.error(`No command matching ${interaction.commandName} was found.`);
//     return;
//   }

//   try {
//     await command.execute(interaction);
//   } catch (error) {
//     console.error(error);
//     if (interaction.replied || interaction.deferred) {
//       await interaction.followUp({
//         content: "There was an error while executing this command!",
//         ephemeral: true,
//       });
//     } else {
//       await interaction.reply({
//         content: "There was an error while executing this command!",
//         ephemeral: true,
//       });
//     }
//   }
// });
client.on("messageCreate", (message) => {
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
    args.shift();
    // args.shift();
    command.execute(client, message, ...args);
    console.log("command executed");
  }
});

// Log in to Discord with your client's token
function main() {
  // loops
  let count = 0;

  // setInterval(async () => {
  //   console.log("Hello");
  //   const seanChannel = await getChannel(client, {
  //     channel: { id: "1234396135771213971" },
  //   });

  //   const seanTokens = await prisma.userRobinhoodTokens.findFirst({
  //     where: {
  //       accountId: "799908983",
  //     },
  //   });
  //   const orders = await getCurrentOrder(
  //     seanTokens.token,
  //     seanTokens.accountId
  //   );

  //   console.log(orders);
  //   if (orders["results"].length > 0) seanChannel.send(orders["results"][0].id);
  // }, 1000);

  setInterval(async () => {
    let expertOrders = await prisma.expertRobinTrades.findMany({
      where: {
        Status: "OPEN",
      },
    });
    // console.log("expert order", expertOrders);
    // confirm check if the orders are 10s older
    console.log(expertOrders);
    expertOrders = expertOrders.filter(
      (el) => (Date.now() - el.UpdatedAt.getTime()) / 1000 >= 10
    );

    for (let order of expertOrders) {
      // continue;
      // console.log("order", order);
      const accountInfo = await prisma.userRobinhoodTokens.findFirst({
        where: {
          accountId: order.AcccountId,
        },
      });
      if (order.retries >= orderRetries) {
        console.log(order);
        try {
          try {
            await cancelOptionOrder(accountInfo.token, order.ref_id);
          } catch (e) {
            console.log(e);
          }
          await prisma.expertRobinTrades.update({
            data: {
              Status: "DEAD",
            },
            where: {
              id: order.id,
            },
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          let response = await getCurrentOrder(
            accountInfo.token,
            accountInfo.accountId
          );

          let orders = response["results"];
          orders = orders.filter(
            (el) => el.state != "cancelled" || el.state == "filled"
          );

          for (let order of orders) {
            const change = order["legs"][0].side == "buy" ? 0.05 : -0.01;
            // console.log(order.id);
            // console.log("Trying to place order");
            // console.log(order["price"]);
            const newPrice =
              parseFloat(parseFloat(order["price"]).toFixed(2)) + change;
            // console.log(newPrice);
            if (newPrice > 0) {
              try {
                await cancelOptionOrder(accountInfo.token, order.id);
              } catch (e) {
                console.log(e);

                continue;
              }
              let newOrder = await placeOptionsOrder(
                order.account_number,
                accountInfo.token,
                order.chain_symbol,
                order.direction,
                order["legs"][0].strike_price,
                order["legs"][0].side,
                newPrice.toFixed(2),
                order.quantity,
                order.time_in_force,
                order.trigger,
                order.type,
                order["legs"][0].ratio_quantity,
                order["legs"][0].position_effect,
                order["legs"][0]["expiration_date"],
                order["legs"][0]["option_type"]
              );
              console.log("newOrder", newOrder.id);
              if (accountInfo.accountId == "799908983") {
                const seanChannel = await getChannel(client, {
                  channel: { id: "1234396135771213971" },
                });
                const embed = new EmbedBuilder()
                  .setColor(0x0099ff)
                  .setTitle("Trade Update: ")
                  .addFields(
                    {
                      name: "Expert ID",
                      value: "<@" + "510716396276285440" + ">",
                    },
                    { name: "Created At", value: newOrder.created_at },
                    { name: "Updated At", value: Date.now() },
                    { name: "Status", value: "OPEN" },
                    {
                      name: "Strike Price",
                      value: newOrder.legs[0]["striket_price"],
                    },
                    { name: "Direction", value: newOrder.direction },
                    {
                      name: "Ratio Quantity",
                      value: newOrder.legs[0].ratio_quantity,
                    },
                    {
                      name: "Position Effect",
                      value: newOrder.legs[0].position_effect,
                    },
                    {
                      name: "Expiration Date",
                      value: newOrder.legs[0].expiration_date,
                    },
                    { name: "Side", value: "Buy" }
                  );
                await seanChannel.send(embed);
              }

              try {
                await prisma.expertRobinTrades.update({
                  data: {
                    ref_id: newOrder.id,
                  },
                  where: {
                    ref_id: order.id,
                  },
                });
              } catch (e) {
                console.log(e);
              }
            }
          }
        } catch (e) {
          // console.log("here", e);
          let channel = await getChannel(client, {
            channel: { id: "1231463512543461466" },
          });
          await channel.send(
            `An error accounted while placing a order cancellation.\nReason: ${e.message}`
          );
        }
        /// updating database
        try {
          await prisma.expertRobinTrades.update({
            data: {
              retries: order.retries + 1,
            },
            where: {
              id: order.id,
            },
          });
        } catch (e) {
          console.log(e);
        }
      }
    }

    console.log("count", count++, Date.now());
  }, 5000);
  client.login(
    "MTIyODcwMjkxODE0NDY5MjI4NQ.G_-4M9.Yi1dnemYJ2xy7PXCfyb5Xn-teI0IC2Nr_ecIh4"
  );
}

main();
