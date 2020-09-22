const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const prefix = config.prefix;

// Returns an array of all files in the commands folder and filters out non-JS files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);

}

client.login(client.token);

// READY
client.once('ready', () => {

    console.log('Connected as ' + client.user.tag);

});

client.on('message', message => {

    // Message has to start with the - prefix and can't be sent by a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Slices the actual content of the message, trims the white space, and splits the string into a list
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    // Shift the command message to lowercase
	const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.guildOnly && message.channel.type === 'dm') {

        return message.reply('Dont try any of that shit boi');

    }

    if (command.args && !args.length) {

        let reply = `No arguments were provided, ${message.author}`;

        if (command.usage) {

            reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;

        }

        return message.channel.send(reply);

    }

	try {

        client.commands.get(commandName).execute(message, args);

    }

    catch (error) {

        console.error(error);

        message.reply('Invalid Command');

	}

});

// Test command
client.on('message', message => {

    if (message.content === `${prefix}test`) {

        message.reply(`${client.user.tag} is online.`);

    }

});

// Chat logger
client.on('message', message => {

    console.log(`${message.author.tag}: ${message.content}`);

    console.log(`message.length: ${message.content.length}`);

});