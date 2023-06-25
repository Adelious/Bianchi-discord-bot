const discord = require("discord.js");
const loadSlashCommands = require("../Loaders/loadSlashCommands");

module.exports = async (client, message) => {
  console.log(`${client.user.tag} est opérationnel`);
  await loadSlashCommands(client);
};
