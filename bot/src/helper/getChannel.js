function getChannel(client, message) {
  const channel = client.channels.cache.get(message.channel.id);
  return channel;
}

module.exports = getChannel;
