const prisma = require("../db");
const placeOptionsOrder = require("../robinhood/order/placeOptionOrder");
module.exports = {
  name: "expert",
  description: " Export only. Place bulk orders",
  execute: async (client, message, ...args) => {
    if (args.length != 9) return message.reply("Please specify all the values");
    const expert = args[7];
    const users = await prisma[expert].findMany();
    const startTime = process.hrtime();
    for (const user of users) {
      const userTokenData = await prisma.userRobinhoodTokens.findUnique({
        where: {
          authorId: user.userid,
        },
      });

      if (!userTokenData)
        return message.reply(
          "You haven't setup your account <@" +
            user.useid +
            "> . use !sub <account id> <access_token> "
        );
      try {
        placeOptionsOrder(
          userTokenData.accountId,
          userTokenData.token,
          args[0], // symbol
          args[8], // direction
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
        )
          .then(async (response) => {
            console.log(response);
            await message.channel.send(
              "Order Placed Success full. Please check console. It took " +
                executionTimeInMs * 1000 +
                "seconds"
            );

            await prisma.expertRobinTrades.create({
              data: {
                AcccountId: response.account_number,
                ref_id: response.id,
                expertId: message.author.id,
                Status: "OPEN",
                strike_price: args[2],
                direction: args[8],
                ratio_quantity: 1,
                position_effect: args[4],
                expiration_date: args[1],
                side: args[3],
              },
            });
          })
          .catch(async (e) => {
            console.log("error expert ", e);
            await message.channel.send(
              `Failed Order\nAccount Id: ${userTokenData.accountId}\n` +
                "REASON : " +
                e.message
            );
            // await prisma.expertRobinTrades.create({
            //   data: {
            //     AcccountId: userTokenData.accountId,
            //     ref_id: "######",
            //     expertId: message.author.id,
            //     Status: "DEAD",
            //     strike_price: args[2],
            //     direction: args[8],
            //     ratio_quantity: 1,
            //     position_effect: args[4],
            //     expiration_date: args[1],
            //     side: args[3],
            //   },
            // });
          });
        // console.log("result", result);
        const endTime = process.hrtime(startTime);
        const executionTimeInMs = endTime[0] * 1000 + endTime[1] / 1000000;
      } catch (e) {
        console.log(e);
      }
    }
  },
};
