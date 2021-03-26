const { error_logs } = require('../../config.json'), { MessageEmbed } = require('discord.js')
function sendErrorLog(client, error, type, msgContent) { 
    const name = error.name || "N/A";
    const code = error.code || "N/A";
    const httpStatus = error.httpStatus || "N/A";
    const stack = error.stack || "N/A";
    const content = msgContent || "N/A";
  
    const embed = new MessageEmbed()
      .setTitle("An error occurred")
      .addField("Name", name, true)
      .addField("Code", code, true)
      .addField("httpStatus", httpStatus, true)
      .addField("Command executed", content, true)
      .setDescription(`\`\`\`${stack}\`\`\` `)
      .setColor(type === "error" ? "RED" : "ORANGE");
  
    client.channels.cache.get(error_logs)?.send(embed);
  }

  module.exports = {
      sendErrorLog
  }