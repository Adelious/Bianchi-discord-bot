const Discord = require("discord.js");
const { commandeCategoryID } = require("../config.json");
const { commandeArchiveCategoryID } = require("../config.json");
const { verifRoleID } = require("../config.json");
const { verifRoleID2 } = require("../config.json");
const { clientRoleID2 } = require("../config.json");
const { clientRoleID } = require("../config.json");

module.exports = {
  name: Discord.Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing /${interaction.commandName}`);
        console.error(error);
      }
    }

    ////////////////////////////////////////////////////////////////

    if (interaction.isButton()) {
      if (interaction.customId === "commande") {
        let channel = await interaction.guild.channels.create({
          name: `commande-${interaction.user.username}`,
          type: Discord.ChannelType.GuildText,
        });

        await channel.setParent(commandeCategoryID);

        await channel.permissionOverwrites.create(interaction.user.id, {
          ViewChannel: true,
          EmbedLinks: true,
          SendMessages: true,
          ReadMessageHistory: true,
          AttachFiles: true,
        });

        await interaction.reply({
          content: `Votre commande a correctement été créé : ${channel}`,
          ephemeral: true,
        });

        await channel.setTopic(interaction.user.id);

        let embed = new Discord.EmbedBuilder()
          .setColor(Discord.Colors.Blue)
          .setTitle("creation d'une commande")
          .setThumbnail(
            interaction.client.user.displayAvatarURL({ dynamic: true })
          )
          .setDescription("commande crée")
          .setTimestamp()
          .setFooter({
            text: interaction.client.user.username,
            iconURL: interaction.client.user.displayAvatarURL({
              dynamic: true,
            }),
          });

        await interaction.member.roles.add(clientRoleID2);
        await interaction.member.roles.add(clientRoleID);

        const button = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("close-commande")
            .setLabel("fermer le commande")
            .setStyle(Discord.ButtonStyle.Danger)
            .setEmoji("🗑️")
        );

        await channel.send({ embed: embed, components: [button] });
      }

      if (interaction.customId === "close-commande") {
        let user = interaction.client.users.cache.get(
          interaction.channel.topic
        );
        try {
          await user.send("Votre commande a été fermée");
        } catch (error) {
          console.log(error);
        }

        await interaction.member.roles.remove(clientRoleID2);
        await interaction.member.roles.remove(clientRoleID);

        await interaction.channel.setParent(commandeArchiveCategoryID);
      }

      if (interaction.customId === "verif") {
        let user = interaction.client.users.cache.get(
          interaction.channel.topic
        );
        if (!interaction.member.roles.cache.has(verifRoleID)) {
          await interaction.member.roles.add(verifRoleID);
          await interaction.member.roles.add(verifRoleID2);

          await interaction.reply({
            content: "Vous venez d'être verifié verifié",
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content: "Vous êtes déjà verifié",
            ephemeral: true,
          });
        }
      }
    }
  },
};
