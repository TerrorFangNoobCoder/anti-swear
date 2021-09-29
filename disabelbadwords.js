const db = require("quick.db")
const { MessageEmbed } = require("quick.db")
var { default_prefix } = require("../../config.json")

module.exports = {
  name: "badwordsdisable",
  aliases: ["bad-words-off", "badwordsoff", "disable-bad-words", "disabelbadwords"],
  description: "disables badwords for the server",
  usage: "g!disabelbadwords",
  category: "anti-words system",
  run: async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You need `MANAGE_MESSAGES` perms for doing that")
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = default_prefix;
    if(db.has(`antiwordssystem-${message.guild.id}`)) {
      db.delete(`antiwordssystem-${message.guild.id}`)
      message.channel.send("disabled badwords system for this server")
    } else {
      message.channel.send(`bad words are already disabled, use \`${prefix}badwordsdisable\` if you want it to be disabled`)
    }
  }
}
