module.exports = (client, message, queue) => {
    message.client.send(`${client.emotes.error} - Musics stopped as i have been disconnected from the channel !`)
};