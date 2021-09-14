module.exports = (client, message,query) => {
    message.channe.send(`${client.emotes.error} - No results found on Youtube for ${query} !`);
};