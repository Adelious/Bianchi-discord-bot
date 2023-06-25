const Discord = require("discord.js");

module.exports = {
  name: "ticket",
  description: "Envoie l'embed des tickets",
  permission: Discord.PermissionFlagsBits.ManageGuild,
  dm: false,
  category: "Administration",
  options: [],

  async run(client, message, args) {
    let embed = new Discord.EmbedBuilder()
      .setColor(Discord.Colors.Blue)
      .setTitle("creation d'un ticket")
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setDescription("Creation d'un ticket")
      .setTimestamp()
      .setFooter({
        text: client.user.username,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      });

    const button = new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder()
        .setCustomId("ticket")
        .setLabel("Créer un ticket")
        .setStyle(Discord.ButtonStyle.Primary)
        .setEmoji("📩")
    );

    await message.reply({ embeds: [embed], components: [button] });
  },
};
