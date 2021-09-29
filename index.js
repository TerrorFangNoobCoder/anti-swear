const { Collection, MessageEmbed } = require("discord.js");
const Discord = require('discord.js')
const { config } = require("dotenv");
const { default_prefix, token, bstoken } = require("./config.json")
const express = require("express")
const app = express()
const db = require('quick.db')
const chalk = require('chalk')

const client = new Discord.Client({ 
   disableEveryone: true,
 })
require('discord-buttons')(client)
// Collections
client.commands = new Collection();
client.aliases = new Collection();


// Run the command loader
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on('ready', async () => {
app.get("/", (req, res) => {
 res.send('Bot on!')
});

app.listen(3000, () => {
console.log(`${chalk.red(`${client.user.username}`)} is now online!\nViewing ${chalk.blue(`${client.guilds.cache.size}`)} servers with ${chalk.rgb(94, 235, 52)(`${client.users.cache.size}`)} Members!`)
console.log('Connected to Brawl Stars API!')
});

setInterval(async () => {
  let servercount = await client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)
  const servers = await client.guilds.cache.size
  const activitieslist = [
    `g!help | watching ${servercount} members`,
    `g!help | Moderatiing ${servers} servers`,
    `g!invite | Made by T-fang`,
  ];
  const status = activitieslist[Math.floor(Math.random() * activitieslist.length)]
  client.user.setPresence({ activity: { name: `${status}` }, status: 'dnd' })
}, 10000);
})

client.on("message", async message => {
   if(!message.guild) return;
   if(message.author.bot) return;
     let prefix = db.get(`prefix_${message.guild.id}`)
     if(prefix === null) prefix = default_prefix;
    if(message.content.includes(client.user.id)) {
      message.channel.send(
        new MessageEmbed()
        .setTitle('Prefix!')
        .setDescription(`My prefix for ${message.guild} is **${prefix}**`)
        .setColor("RANDOM")
      )
    }
    if(db.has(`antiwordssystem-${message.guild.id}`)) {
      const badwords = db.get(`badwords-${message.guild.id}.thewords`)
      for (let anyword = 0; anyword < badwords.length; anyword++) {
        if(message.content.toLowerCase().includes(badwords[anyword])) {
          if(message.author.hasPermission("MANAGE_MESSAGES") || message.author.hasPermission("ADMINISTRATOR")) return;
          message.delete()
          message.reply(":x: no bad words").then(msg => msg.delete({ timeout: 5000 }))
        }
      }
    }
    if (!message.content.startsWith(prefix)) return;
    
    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);
});

client.login(token)
