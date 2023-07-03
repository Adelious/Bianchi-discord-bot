const { MessageAttachment, EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require("discord.js");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder().setName("ticket").setDescription("Création de l'embed de ticket"),
  async execute(interaction) {
    let embed = new EmbedBuilder()
      .setColor(Colors.Blue)
      .setTitle("Bianchi Industrie")
      .setThumbnail("https://www.dropbox.com/s/h738jija1fw236r/fruit.png?dl=1")
      .setDescription("Merci de nous donner ces informations: \n • Combien de fruit voulez-vous ? \n • Quel type voulez-vous ? \n • Quand voulez-vous votre commande ? \n ")
      .setTimestamp()
      .setFooter({
        text: interaction.client.user.username,
        iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }),
      });

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("commande")
        .setLabel("Créer une commande")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("📩")
    );

    await interaction.reply({ embeds: [embed], components: [button]});
  },
};
