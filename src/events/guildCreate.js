const { guildJoin } = require("../../config.json");
const { MessageEmbed } = require('discord.js')
module.exports = (client, guild) => {
    const LogBed = new MessageEmbed()
    .setTitle(`New server ${guild.name} here is some info!`)
    .addField("Owner", guild.owner.user.tag)
    .addField("MemberCount", guild.memberCount)
    .addField("Name", guild.name)
    .addField("ID", guild.id)
    .setColor("RED")
    .setTimestamp();
    client.channels.cache.get(guildJoin).send(LogBed)
};
