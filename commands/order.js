// commands/order.js
const fs = require('fs');

module.exports = {
    name: 'order',
    description: 'Buat order baru',
    async execute(message, args, client) {
        if (args.length === 0) return message.reply('Tolong sebutkan item yang ingin dipesan.');

        const item = args.join(' ');
        const guild = message.guild;

        // Buat channel baru untuk ticket order
        const channel = await guild.channels.create({
            name: `order-${message.author.username}`,
            type: 0, // text channel
            permissionOverwrites: [
                { id: guild.roles.everyone, deny: ['ViewChannel'] },
                { id: message.author.id, allow: ['ViewChannel', 'SendMessages'] }
            ]
        });

        channel.send(`Halo ${message.author}, terima kasih sudah memesan **${item}**. Silakan lakukan pembayaran melalui link berikut: https://saweria.co/usernameanda`);

        // Simpan order ke file JSON
        let orders = [];
        if (fs.existsSync('orders.json')) {
            orders = JSON.parse(fs.readFileSync('orders.json'));
        }
        orders.push({ user: message.author.id, item, channelId: channel.id, timestamp: new Date() });
        fs.writeFileSync('orders.json', JSON.stringify(orders, null, 2));

        message.reply(`Order kamu untuk **${item}** telah dibuat! Silakan cek channel ${channel}.`);
    }
};
