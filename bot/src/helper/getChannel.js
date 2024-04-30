async function getChannel(client, message) {
  console.log(message.channel.id);
  const channel = await client.channels.fetch(message.channel.id);
  return channel;
}

module.exports = getChannel;
