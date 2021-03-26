const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Get my commands!",
  category: "info",
  async execute(message, args) {
    if (args[0]) {
      const command = await message.client.commands.get(args[0]);

      if (!command) {
        return message.channel.send("Unknown Command: " + args[0]);
      }

      let embed = new MessageEmbed()
        .setAuthor(command.name, message.client.user.displayAvatarURL())
        .addField("Description", command.description || "Not Provided")
        .setThumbnail(message.client.user.displayAvatarURL())
        .setColor("GREEN")
        .setFooter(message.client.user.username, message.client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      const commands = await message.client.commands;

      let emx = new MessageEmbed()
        .setDescription("My command list :D")
        .setColor("GREEN")
        .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
        .setThumbnail(message.client.user.displayAvatarURL());

      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Unknown";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for(const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";

        emx.addField(`${category.toUpperCase()}[${value.length}]`, desc);
      }
      return message.channel.send(emx);
    }
  },
};
