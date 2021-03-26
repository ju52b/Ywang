const { guildLeave } = require("../../config.json");
const { MessageEmbed } = require('discord.js')
module.exports = (client, guild) => {
    const LogBed = new MessageEmbed()
    .setTitle(`I have left the guild: ${guild.name} here was the info`)
    .addField("Owner", guild.owner.user.tag)
    .addField("MemberCount", guild.memberCount)
    .addField("Name", guild.name)
    .addField("ID", guild.id)
    .setColor("RED")
    .setTimestamp();
    client.channels.cache.get(guildLeave).send(LogBed)
};
