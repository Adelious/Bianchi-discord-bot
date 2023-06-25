const fs = require("fs");
require("dotenv").config();
const { REST, Routes } = require("discord.js");

const clientId = process.env["CLIENT_ID"];
const guildId = process.env["GUILD_ID"];

module.exports = async (client) => {
  fs.readdirSync("./src/Commands")
    .filter((f) => f.endsWith(".js"))
    .forEach(async (file) => {
      let command = require("../Commands/" + file);
      if (!command.name || typeof command.name !== "string")
        throw new TypeError(
          `La commande ${file.slice(0, file.lenght - 3)} n'a pas de nom`
        );
      client.commands.set(command.name, command);
      console.log(`Commande ${file} chargée avec succès!`);
    });
};
