const { guildModel, ticketModel } = require("../../data/export");
module.exports = {
  name: "close",
  description: "Close a ticket!",
  cooldown: 3,
  category: "tickets",
  async execute(message) {
    const ticketDoc = await ticketModel.findOne({
      guild: message.guild.id,
      channelID: message.channel.id,
    });
    const guildDoc = await guildModel.findOne({ Guild: message.guild.id });
    const e = message.member;
    const user = await message.guild.members.cache.get(e.id);

    if (
      user.id === ticketDoc.owner ||
      message.member.hasPermission("MANAGE_CHANNELS")
    ) {
      const channel = await message.guild.channels.cache.get(
        ticketDoc.channelID
      );
      channel.updateOverwrite(message.client.users.cache.get(ticketDoc.owner), {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false,
      });
      const msg = await channel.send(
        "React with š to re-open this ticket or with \nā to Close the ticket \n š° to get a transcript !"
      );
      await msg.react("š");
      await msg.react("ā");
      await msg.react("š°");
      ticketDoc.msg = msg.id;
      ticketDoc.save();
    } else {
      return message.reply(
        "You cannot do this you are not the owner of the ticket or you dont have the permissions!"
      );
    }
  },
};
