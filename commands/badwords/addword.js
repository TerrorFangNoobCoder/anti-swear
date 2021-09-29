const db = require("quick.db")
const { MessageEmbed } = require('discord.js')
const { default_prefix } = require('../../config.json')

module.exports = {
  name: "addbadword",
  aliases: ["addword", "badwordsadd"],
  usage: "g!badwordsadd <the word>",
  category: "anti-words system",
  description: "adds words to the bad word system",
  run: async (client, message, args) => {
    message.channel.startTyping()
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You need `MANAGE_MESSAGES` perms for doing that")
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = default_prefix;
    const ThatWord = args.join(" ")
    if(!ThatWord) return message.channel.send(`Must type a Word with the command like: \`${prefix}badwordsadd <word>\``)
    if(!isNaN(ThatWord)) return message.channel.send("no numbers allowed")
    if(ThatWord.length > 25) return message.channel.send("word can't have more than 25 letters")
    db.push(`badwords-${message.guild.id}.thewords`, ThatWord.toLowerCase())
    const badwords = db.get(`badwords-${message.guild.id}.thewords`).join(", ")
    if(badwords === null) badwords = "none"
    message.channel.send(
      new MessageEmbed().setTitle('Added badwords for ' + message.guild).setDescription(`Added ${ThatWord} to badwords list\n\n**The list is :**\n${badwords} `).setColor("RANDOM")
    )
    message.channel.stopTyping()
  }
}

//check index.js line 66 for anti-word
