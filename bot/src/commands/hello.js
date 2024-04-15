module.exports = {
  name: "hello",
  description: "Initial command",
  execute: (client, message, ...args) => {
    // if (args.length != 1) return;
    const channel = client.channels.cache.get(message.channel.id);
    if (channel) {
      channel.send("!Hello");
    }
  },
};
