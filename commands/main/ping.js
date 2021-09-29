module.exports = {
  name: 'ping',
  category: 'main',
  run: async (client, message, args) => {
  let infoem = new MessageEmbed()
  .setTitle("**Beam Bot's Info!**")
  .setDescription(`:timer:**Latency: **${client.ws.ping}ms Latency!\n\n[SupportServer](https://discord.gg/NYAKXKfMYq)`)
  .setFooter(`Requested by ${message.author.username}`)
  .setTimestamp()
  .setColor("GREEN")
  message.channel.send(infoem)
  }
}
