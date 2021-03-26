module.exports = {
  name: "invite",
  description: "Get my invite link!",
  category: "info",
  execute(message) {
    message.channel.send(
      "https://discord.com/api/oauth2/authorize?client_id=728356164546461857&permissions=0&scope=bot"
    );
  },
};
