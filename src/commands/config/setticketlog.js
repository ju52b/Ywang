const { guildModel } = require("../../data/export");
module.exports = {
  name: "setlogs",
  description: "Set's the ticket logs.",
  category: "config",
  async execute(message, args) {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply("You don't have the right permissions for this!");
    const GEa = await guildModel.findOne({ Guild: message.guild.id });
    const channel = message.client.findChannel(message, args, false);
    if (!channel) {
      await GEa.updateOne({
        log: null,
      });
      return message.reply("The ticket logs has been reset.");
    }
    if (channel) {
      await GEa.updateOne({
        log: channel.id,
      });
      return message.channel.send("The logs channel has been set!");
    }
  },
};
