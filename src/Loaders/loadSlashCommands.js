require("dotenv").config();

const Discord = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = async (client) => {
  let commands = [];
  client.commands.forEach(async (command) => {
    let slashCommand = new SlashCommandBuilder()
      .setName(command.name)
      .setDescription(command.description)
      .setDMPermission(command.dm)
      .setDefaultMemberPermissions(
        command.permission === "Aucune" ? null : command.permission
      );

    if (command.options?.length >= 1) {
      for (let i = 0; i < command.options.length; i++) {
        slashCommand[
          `add${
            command.options[i].type.slice(0, 1).toUpperCase() +
            command.options[i].type.slice(1, command.options[i].type.length)
          }Option`
        ]((option) =>
          option
            .setName(command.options[i].name)
            .setDescription(command.options[i].description)
            .setRequired(command.options[i].required)
        );
      }
    }

    await commands.push(slashCommand);
  });

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
    body: commands,
  });
  console.log("Les slash commands ont bien été créées avec success!");
};
