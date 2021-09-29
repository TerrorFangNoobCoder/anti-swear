const db = require("quick.db")
const { MessageEmbed } = require("quick.db")
var { default_prefix } = require("../../config.json")

module.exports = {
  name: "badwordsenable",
  aliases: ["bad-words-on", "badwordson", "enable-bad-words", "enablebadwords"],
  description: "enables badwords for the server",
  usage: "g!enablebadwords",
  category: "anti-words system",
  run: async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You need `MANAGE_MESSAGES` perms for doing that")
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = default_prefix;
    if(!db.has(`antiwordssystem-${message.guild.id}`)) {
      db.set(`antiwordssystem-${message.guild.id}`, 404)
      message.channel.send("Enabled badwords system for this server")
    } else {
      message.channel.send(`bad words are already enabled, use \`${prefix}badwordsdisable\` if you want it to be disabled`)
    }
  }
}
