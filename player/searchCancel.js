module.exports = (client, message, query, tracks) => {
    message.channel.send(`${client.emotes.error} - You did not provide a valid respone ... Please send the command again!`);
};