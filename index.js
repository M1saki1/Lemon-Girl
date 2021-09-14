const fs = require('fs');
const discord = require('discord.js');

const client = new discord.Client({ disableMentions: 'everyone' });

const { Player } = require('discord-player');

client.player = new Player(client);
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.commands = new discord.Collection();
client.aliases = new discord.Collection();

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
        if (command.aliases == undefined) return;
        //wait for a min
        command.aliases.forEach(e => {
            client.aliases.set(e, command.name.toLowerCase())
        })
    };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./events/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};
client.on('message', async function (message) {
    console.log(message.content);
    if (message.content.startsWith(client.config.discord.prefix)) {
        var args = message.content.split(/ +/g);
        console.log('Message arguments:', args);
        var cmd = args[0].replace(client.config.discord.prefix, '');
        console.log('Requested command: ', cmd);
        if (client.commands.get(cmd) != undefined) {
            client.commands.get(cmd).execute(client, message, args.shift())
        } else {
            if(client.aliases.get(cmd) == undefined) return message.reply(`Invalid command! Use \`${client.config.discord.prefix}help\` to show all avaiable commands.`)
            client.commands.get(client.aliases.set(cmd)).execute(client, message, args.shift())
        }
    } 
});
client.on('ready', async () => {
    console.log('Logged in as', client.user.tag)
})
client.login(client.config.discord.token);
