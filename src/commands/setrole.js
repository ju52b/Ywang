const { guildModel } = require("../data/export");
module.exports = {
  name: "setrole",
  description: "Set's the support role.",
  async execute(message, args) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply("You don't have the right permissions for this!");
    const GEa = await guildModel.findOne({ Guild: message.guild.id });
    const channel = message.client.findRole(message, args, false);
    if (!channel) {
      await GEa.updateOne({
        role: null,
      });
      return message.reply("The ticket logs has been reset.");
    }
    if (channel) {
      await GEa.updateOne({
        role: channel.id,
      });
      return message.channel.send("The support role has been set!");
    }
  },
};
