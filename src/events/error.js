module.exports = (client, error) => {
    client.functions.sendErrorLog(client, error, "client error")
};
