const { Events, MessageAttachment } = require("discord.js");
const { welcomeChannelID } = require("../config.json");
const canvas = require("canvas");
const path = require("path");
const Welcomer = require("../structures/welcomer");

module.exports = {
  name: Events.GuildMemberAdd,
  once: true,
  execute: async (member) => {
    try{
      const image = new Welcomer()
      .setBackground(
        "https://i.pinimg.com/originals/07/28/dc/0728dc400eca09632215055ff003d8bf.gif"
      )
      .setGIF(true)
      .setAvatar(member.user.displayAvatarURL({ format: "png" }))
      .setName(member.user.username)
      .setDiscriminator(member.user.discriminator)
      .setBlur(2);

    const channel = await member.guild.channels
      .fetch()
      .then((channels) => channels.find((x) => x.name === "welcome"));
    }catch(error) {
      console.error(error);
    }
    

    console.log(member.user.username + " a rejoint le server!");
    console.log("tt");
    if (welcomeChannelID !== "") {
      member.guild.channels.cache
        .get(welcomeChannelID)
        .send(`${member.user.username} a rejoint le serveur!`);

      return channel?.send({
        files: [new MessageAttachment(await image.generate(), "welcome.gif")],
      });
    }
  },
};
