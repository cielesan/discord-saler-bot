// commands/ping.js
module.exports = {
    name: 'ping',
    description: 'Cek apakah bot aktif',
    async execute(message, args, client) {
        message.reply('Pong! 🏓');
    }
};
