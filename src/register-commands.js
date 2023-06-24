require('dotenv').config();
const { REST, Routes } = require("discord.js");

const clientId = process.env['CLEINT_ID'];
const guildId = process.env['GUILD_ID'];

const commands = [
    {
        name: 'hey',
        desciption: 'replies with hey',
    },
]

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Enregistrement des commandes ...');
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands } 
        );
        console.log('Commandes enregistrées avec succès !')
    } catch (error) {
        console.log("Il y a  une erreur " + error);
    }
})()