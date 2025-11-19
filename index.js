const express = require('express');
const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Bot Lan Lan Manager is running!');
});

app.listen(port, () => {
  console.log(`HTTP server running on port ${port}`);
});

// Discord bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Command handler
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("ready", () => {
    console.log(`Bot aktif sebagai ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const prefix = "!";
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    try {
        await client.commands.get(commandName).execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply("Terjadi kesalahan saat menjalankan perintah ini.");
    }
});

client.login(process.env.TOKEN);

