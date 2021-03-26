const { execute } = require("../tickets/add");

module.exports = {
  name: "restart",
  description: "Restart the bot",
  developerOnly: true,
  async execute(message) {
    await message.channel.send("Restarting :)");
    process.exit(1);
  },
};
