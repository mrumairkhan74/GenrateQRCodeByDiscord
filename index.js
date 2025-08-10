require('dotenv').config();
const { Client,AttachmentBuilder ,GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
const QRCode = require('qrcode');
const QrCode = require('./models/QRModel');
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(process.env.PORT , () => {
  console.log(`Web server running on port ${process.env.PORT}`);
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        // GatewayIntentBits.GuildPublicThreads,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    message.reply({
        content: 'Welcome to **Programming & Coding Community!** Please use the /qrcode command to generate a **QR code** for a URL.',
    });
});


client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === 'qrcode') {
        const url = interaction.options.getString('url');
        if (!url) {
            return interaction.reply({ content: 'Please provide a valid URL.', ephemeral: true });
        }
        try {
            const qrBuffer = await QRCode.toBuffer(url, { type: 'png' });
            const file = new AttachmentBuilder(qrBuffer, { name: 'qrcode.png' });

            // save in mongodb
            await QrCode.create({
                userId: interaction.user.id,
                url: url,
            });
            // Here you would generate the QR code and send it back to the user
            await interaction.reply({ content: `QR code generated for URL: ${url}`, files: [file], ephemeral: true });
        } catch (error) {
            console.error('Error generating QR code:', error);
            return interaction.reply({ content: 'There was an error generating the QR code.', ephemeral: true });
        }
    }
})
const discordToken = process.env.DISCORD_TOKEN;
const db = mongoose.connect(process.env.MONGO_URI)
db.then(() => {
    console.log('Connected to MongoDB');
    client.login(discordToken);
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});
client.login(discordToken);


