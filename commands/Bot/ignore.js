module.exports.run = async (client, message, args, settings) => {
    switch (args[0].toLowerCase()) {
        case 'add':
            const channelToAdd = await client.resolveChannel(message.guild, args[1])
            if (!channelToAdd) return message.channel.sendErrorMessage(`Channel not found.`)
            else {
                settings.ignoreChannel.push(channelToAdd.id);
                await settings.save();
                message.channel.sendSuccessMessage(`This channel is now ignored.`);
            }
            break;
        case 'rem':
            const channelToRem = client.resolveChannel(message.guild, args[1]);
            if (!channelToRem) return message.channel.sendErrorMessage(`Channel not found.`);
            if (!settings.ignoreChannel.includes(channelToRem.id)) return message.channel.sendErrorMessage(`This channel is not ignored.`);
            const index = settings.ignoreChannel.indexOf(channelToRem.id);
            settings.ignoreChannel.splice(index, 1);
            await settings.save();
            message.channel.sendSuccessMessage(`The channel ${channel.name} is no longer ignored.`);
            break;
        case 'list':
            if (!settings.ignoreChannel || settings.ignoreChannel.length < 1) return message.channel.sendErrorMessage(`There are no ignored channels for this guild.`)
            let embed = {
                title: `List of ignored channels for the server **${message.guild.name}** | ${settings.ignoreChannel.length} in total`,
                thumbnail: {
                    url: `${message.guild.iconURL()}`,
                },
                color: `${client.config.color.EMBEDCOLOR}`,
                description: null,
                fields: []
            };
            embed.description = `<#${settings.ignoreChannel.join('>, <#')}>`;
            message.channel.send({ embed });
            break;
    }
}
module.exports.help = {
    name: 'ignore',
    aliases: ['ignore'],
    category: 'bot',
    description: 'Desactive le bot dans un channel.',
    cooldown: 5,
    usage: '<action> <args>',
    exemple: ["ignore add @Channel"],
    moderator: false,
    isUserAdmin: false,
    args: false,
    userPermissions: ['MANAGE_GUILD'],
    botPermissions: [],
    subcommands: [
        {
            name: 'add',
            description: 'Ignore a channel for bot commands.',
            usage: '[channel]',
            args: 1,
            exemples: ['#general', '710761432534351925']
        },
        {
            name: 'rem',
            description: 'Enable ignored channel for bot commands.',
            usage: '[channel]',
            args: 1,
            exemples: ['#general', '710761432534351925']
        },
        {
            name: 'list',
            description: 'Ignore a channel for bot commands.',
            usage: '[channel]',
            args: 0,
            exemples: []
        },
    ]
}
