const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "Affiche la latence du bot",
  permission: "Aucune",
  dm: true,
  category: "Administration",

  async run(client, message) {
    await message.reply(`Ping: \`${client.ws.ping}\``);
  },
};
