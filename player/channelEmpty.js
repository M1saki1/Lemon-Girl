module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.error} - No one in the voice channel...I will stop the music.`);
};