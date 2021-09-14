module.exports = (client, error, message, ...args) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send(`${client.emotes.error} - There is no music being played on this server dude ಠ_ಠ `);
            break;
        case 'NotConnected':
            message.channel.send(`${client.emotes.error} - You are not connected in any voice channel !`);
            break;
        case 'UnableToJoin':
            message.channel.send(`${client.emotes.error} - I am not able to join ur voice channel, pwease check my permissions!`);
            break;
        case 'VideoUnavailable':
            message.channel.send(`${client.emotes.error} - ${args[0].title} is not available in your country! Skipping...`);
            break;
        case 'MusicStarting':
            message.channel.send(`The music is starting... so please wait and retry!`);
            break;
        default:
            message.channel.send(`${client.emotes.error} - Something went wrong ... Error : ${error}`);
        
    };
};