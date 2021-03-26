const { MessageEmbed } = require("discord.js");
const { panelModel } = require("../../data/export");
module.exports = {
  name: "panel",
  description: "Get the panel!",
  cooldown: 3,
  category: "tickets",
  async execute(message) {
    const panel = await panelModel.findOne({
      guild: message.guild.id,
    });
    if (!panel) {
      let a = new panelModel({
        guild: message.guild.id,
      });
      a.save();
    }
    if (panel) {
      const e = new MessageEmbed()
        .setTitle(`Panel`)
        .setDescription(`This is the panel if u react here a ticket will open.`)
        .setFooter("Ticket Bot | made by syd's cloud");
      message.channel.send(e).then(async (msg) => {
        await panelModel.findOneAndUpdate({
          guild: message.guild.id,
          msg: msg.id,
        });
        await msg.react("🎫");
      });
    }
  },
};
