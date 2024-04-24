const {
  Client,
  Events,
  GatewayIntentBits,
  Partials,
  ApplicationCommandType,
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
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Message, Partials.User, Partials.GuildMember],
});
client.on(Events.MessageCreate, (message) => {
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
client.once(Events.ClientReady, (ready) => {
  console.log(`Ready! Logged in as ${ready.user.tag}`);
});

// Log in to Discord with your client's token
function main() {
  // loops
  let count = 0;
  setInterval(async () => {
    let expertOrders = await prisma.expertRobinTrades.findMany({
      where: {
        Status: "OPEN",
      },
    });
    console.log(expertOrders);
    for (let order of expertOrders) {
      const accountInfo = await prisma.userRobinhoodTokens.findFirst({
        where: {
          accountId: order.AcccountId,
        },
      });
      let tempOrder = order;
      if (order.retries >= orderRetries) {
        try {
          await cancelOptionOrder(accountInfo.token, order.ref_id);
        } catch (e) {
          console.log("here", e);
        }
        try {
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
          await cancelOptionOrder(accountInfo.token, order.ref_id);
          getCurrentOrder(accountInfo.token, accountInfo.accountId)
            .then(async (response) => {
              let orders = response["results"];
              // console.log((parseFloat(orders[0]["price"]) + 0.05).toFixed(2));
              // console.log(parseFloat(order.price).toFixed(2) + 0.05);
              for (let order of orders) {
                try {
                  await cancelOptionOrder(accountInfo.token, tempOrder.ref_id);
                } catch (e) {
                  console.log("here", e);
                }

                // console.log("order", order);
                const currentTime = Date.now();

                // Calculate the time difference in milliseconds
                const timeDifference =
                  currentTime - tempOrder.UpdatedAt.getTime();

                // Convert milliseconds to seconds
                const timeDifferenceInSeconds = timeDifference / 1000;
                console.log(timeDifferenceInSeconds);
                const change = tempOrder.side == "buy" ? 0.05 : -0.01;
                if (timeDifferenceInSeconds >= 10)
                  placeOptionsOrder(
                    order.account_number,
                    accountInfo.token,
                    order.chain_symbol,
                    order.direction,
                    tempOrder.strike_price,
                    tempOrder.side,
                    (parseFloat(orders[0]["price"]) + change).toFixed(2),
                    order.quantity,
                    order.time_in_force,
                    order.trigger,
                    order.type,
                    tempOrder.ratio_quantity,
                    tempOrder.position_effect,
                    tempOrder.expiration_date
                  ).then(async (response) => {
                    try {
                      await prisma.expertRobinTrades.update({
                        data: {
                          ref_id: response.id,
                        },
                        where: {
                          ref_id: order.id,
                        },
                      });
                    } catch (e) {
                      console.log(e);
                    }
                  });
              }
            })
            .catch(async (e) => {
              let channel = await getChannel(client, {
                channel: { id: "1231463512543461466" },
              });
              console.log(e);
              await channel.send(
                `An error accounted while placing a order cancellation.\nReason: ${e.message}`
              );
            });
        } catch (e) {
          console.log("here", e);
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
  }, 10000);
  client.login(
    "MTIyODcwMjkxODE0NDY5MjI4NQ.G_-4M9.Yi1dnemYJ2xy7PXCfyb5Xn-teI0IC2Nr_ecIh4"
  );
}

main();
