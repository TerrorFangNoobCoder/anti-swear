const { readdirSync } = require("fs");

const ascii = require("ascii-table");

const Discord = require('discord.js');

const chalk = require('chalk')

// Create a new Ascii table
let table = new ascii("Commands");
table.setHeading("Command", "Working?");

module.exports = (client) => {
    // Read every commands subfolder
    readdirSync("./commands/").forEach(dir => {
        // Filter so we only have .js command files
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

        // Loop over the commands, and add all of them to a collection
        // If there's no name found, prevent it from returning an error,
        // By using a cross in the table we made.
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);

            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, 'Yup');
            } else {
                table.addRow(file, `Nope`);
                continue;
            }

            // If there's an aliases key, read the aliases.
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    // Log the table
    console.log(chalk.blue(table.toString()));
}
