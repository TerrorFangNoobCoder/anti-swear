const db = require("quick.db")
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "badwordslist",
  category: "anti-words system",
  run: async (client, message, args) => {
    const badwords = db.get(`badwords-${message.guild.id}.thewords`).join("\n")
    if(badwords === null) badwords = "none"
    message.channel.send(
      new MessageEmbed()
      .setTitle(`Bad words list for ${message.guild}`)
      .setDescription(`**the list is as follows:**\n${badwords}`)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter("", client.user.displayAvatarURL({ dynamic: true }))
    )
  }
}
