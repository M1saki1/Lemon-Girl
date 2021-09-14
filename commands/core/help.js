module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Core',
    utilisation: '{prefix}help <command name>',

    execute(client, message, args) {
        const Discord = require('discord.js');
        if (!args[0] == undefined) {
            const infos = message.client.commands.filter(x => x.category == 'Infos').map((x) => '`' + x.name + '`').join(', ');
            const music = message.client.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(', ');

            message.channel.send(
                new Discord.MessageEmbed()
                .setColor('ORANGE')
                .setTitle('Help panel')
                .setFooter('This bot uses a Github project made by [Misaa](https://github.com/M1saki1) (ft.[Emilia](https://github.com/CuSO4-c3c))')
                .setFields([
                    { name: 'Bot', value: infos },
                    { name: 'Music', value: music },
                    { name: 'Filters', value: client.filters.map((x) => '`' + x + '`').join(', ') },
                ])
                .setTimestamp()
                .setDescription(`To use filters, ${client.config.discord.prefix}filter (the filter). Example : ${client.config.discord.prefix}filter 8D.`)
                /*{
                embed: {
                    color: 'ORANGE',
                    author: { name: 'Help pannel' }, //pannel .-.))
                    footer: { text: 'This bot uses a Github project made by Misaa (ft.Emilia)' },
                    fields: [
                        { name: 'Bot', value: infos },
                        { name: 'Music', value: music },
                        { name: 'Filters', value: client.filters.map((x) => '`' + x + '`').join(', ') },
                    ],
                    timestamp: new Date(),
                    description: `To use filters, ${client.config.discord.prefix}filter (the filter). Example : ${client.config.discord.prefix}filter 8D.`,
                },
            }*/);
        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return message.channel.send(`${client.emotes.error} - I did not find this command !`);

            message.channel.send(
                new Discord.MessageEmbed()
                .setColor('ORANGE')
                .setTitle('Help panel')
                .setFooter('This bot uses a Github project made by Zerio (ZerioDev/Music-bot)')
                .setFields([
                    { name: 'Name', value: command.name, inline: true },
                    { name: 'Category', value: command.category, inline: true },
                    { name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
                    { name: 'Utilisation', value: command.utilisation.replace('{prefix}', client.config.discord.prefix), inline: true },
                ])
                .setTimestamp()
                .setDescription('Find information on the command provided.\nMandatory arguments `[]`, optional arguments `<>`.')
                /*{
                embed: {
                    color: 'ORANGE',
                    author: { name: 'Help pannel' }, //pannel .-.??
                    footer: { text: 'This bot uses a Github project made by Misaa' },
                    fields: [
                        { name: 'Name', value: command.name, inline: true },
                        { name: 'Category', value: command.category, inline: true },
                        { name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
                        { name: 'Utilisation', value: command.utilisation.replace('{prefix}', client.config.discord.prefix), inline: true },
                    ],
                    timestamp: new Date(),
                    description: 'Find information on the command provided.\nMandatory arguments `[]`, optional arguments `<>`.',
                }
            }*/);
        };
    },
};