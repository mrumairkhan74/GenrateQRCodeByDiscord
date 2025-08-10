require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const commands = [
    new SlashCommandBuilder()
        .setName('qrcode')
        .setDescription('Generate a QR code for a given URL')
        .addStringOption(option => {
            return option
                .setName('url')
                .setDescription('The URL to generate a QR code for')
                .setRequired(true);
        })
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);



(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID,process.env.DISCORD_GUILD_ID),
            { body: commands, },
        );
        console.log('Successfully registered application (/) commands.');
    }
    catch (error) {
        console.error('Error registering commands:', error);
    }
})();