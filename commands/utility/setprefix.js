const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const { Red, Lime } = require('../../colors.json')
const { default_prefix } = require('../../config.json')

module.exports = {
  name: 'setprefix',
  run: async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You are not allowed or do not have permission to change prefix")
    }
    if(!args[0]) {
      return message.channel.send("Please give the prefix that you want to set")
    }
    if(args[1]) {
      return message.channel.send("You can not set prefix a double argument")
    }
    if(args[0].length > 5) {
      return message.channel.send("You can not send prefix more than 5 characters")
    }
    if(args.join("") === default_prefix) {
      db.delete(`prefix_${message.guild.id}`)
     return await message.channel.send("Reseted Prefix ✅")
    }
    db.set(`prefix_${message.guild.id}`, args[0])
   await message.channel.send(`Setted Bot Prefix to ${args[0]}`)
  }
}
