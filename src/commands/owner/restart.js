const { execute } = require("../tickets/add");

module.exports = {
    name: "restart", 
    description: "Restart the bot",
    developersOnly: true,
    async execute(message) {
        await message.channel.send("Restarting :)")
        process.exit(1)
    }
}