require('dotenv').config();
const { Client, GatewayIntentBits, messageLink } = require("discord.js");
const keepAlive = require("./web/server");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers
    ]
});

client.on("ready", () => {
    console.log("Bot opérationnel !");
})

client.on("messageCreate", Message => {
    if (Message.author.bot) return;

    message = Message.content;
    console.log(message);
})

client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return;

    
})

keepAlive()

client.login(process.env.TOKEN);