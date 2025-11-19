const express = require('express');
const app = express();

// Gunakan port yang disediakan Koyeb atau default 8000
const port = process.env.PORT || 8000;

// Endpoint root untuk health check
app.get('/', (req, res) => {
  res.send('Bot Lan Lan Manager is running!');
});

// Jalankan server
app.listen(port, () => {
  console.log(`HTTP server running on port ${port}`);
});
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Token diambil dari environment, bukan ditulis langsung
client.login(process.env.TOKEN);

client.on("ready", () => {
    console.log(`Bot aktif sebagai ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    if (message.content === "!ping") {
        message.reply("Pong!");
    }
});
