const Discord = require("discord.js");

module.exports = async (client, interaction) => {
  if (interaction.type === Discord.InteractionType.ApplicationCommand) {
    try {
      let command = require(`../Commands/${interaction.commandName}`);
      command.run(client, interaction, interaction.options);
    } catch {
      interaction.reply("La commande n'est plus disponible");
    }
  }

  if (interaction.isButton()) {
    if (interaction.customId === "ticket") {
      let channel = await interaction.guild.channels.create({
        name: `ticket-${interaction.user.username}`,
        type: Discord.ChannelType.GuildText,
      });

      await channel.setParent(interaction.channel.parent.id);

      await channel.permissionOverwrites.create(interaction.guild.roles.everyone.id, {
        ViewChannel: false,
      })

      await channel.permissionOverwrites.create(interaction.user.id, {
        ViewChannel: true,
        EmbedLinks: true,
        SendMessages: true,
        ReadMessageHistory: true,
        AttachFiles: true,
      })

      await interaction.reply({
        content: `Votre ticket a correctement été créé : ${channel}`,
        ephemeral: true,
      });

      await channel.setTopic(interaction.user.id);

      let embed = new Discord.EmbedBuilder()
        .setColor(Discord.Colors.Blue)
        .setTitle("creation d'un ticket")
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription("ticket crée")
        .setTimestamp()
        .setFooter({
          text: client.user.username,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        });

      const button = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("close-ticket")
          .setLabel("fermer le ticket")
          .setStyle(Discord.ButtonStyle.Danger)
          .setEmoji("🗑️")
      );

      await channel.send({embed: embed, components: [button]});
    }

    if (interaction.customId === "close-ticket") {
      let user = client.users.cache.get(interaction.channel.topic);
      try {
        await user.send("Le ticket a été fermé");
      } catch (error) {
        console.log(error);
      }

      await interaction.channel.delete();
    }
  }
};
