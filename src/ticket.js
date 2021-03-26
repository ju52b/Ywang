const { Client, Collection } = require("discord.js");
const client = new Client({
  partials: ["CHANNEL", "MESSAGE", "REACTION", "USER"],
  fetchAllMembers: true,
  messageCacheMaxSize: 5000,
});
const { readdirSync } = require("fs");
const { init } = require("./util/mongo");
const config = require("../config.json");
client.functions = require('./util/functions')
client.commands = new Collection();
client.prefix = config.prefix;
client.models = require("./data/export");
client.cooldowns = new Collection();
init();
require("./util/finding")(client)
const commandFiles = readdirSync("./src/commands");
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
const eventFiles = readdirSync("./src/events");
for (const eventFile of eventFiles) {
  const event = require(`./events/${eventFile}`);
  const eventName = eventFile.split(".")[0];
  client.on(eventName, event.bind(null, client));
}

client.login(config.token);
process.on("uncaughtException", (error) => client.functions.sendErrorLog(client, error, "uncaughExeption"))
process.on("uncaughtExceptionMonitor", (error) => client.functions.sendErrorLog(client, error, "uncaughExeptionMonitor"))
