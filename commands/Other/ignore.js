module.exports.run = async (client, interaction, args, settings) => {
    switch (interaction.subcommand) {
        case 'add':
            const channelToAdd = await client.resolveChannel(interaction.guild, args.get('channel').value)
            if (!channelToAdd) return interaction.replyErrorMessage(`Channel not found.`)
            else {
                settings.ignoreChannel.push(channelToAdd.id);
                await settings.save();
                interaction.replySuccessMessage(`This channel is now ignored.`);
            }
            break;
        case 'rem':
            const channelToRem = client.resolveChannel(interaction.guild, args.get('channel').value);
            if (!channelToRem) return interaction.replyErrorMessage(`Channel not found.`);
            if (!settings.ignoreChannel.includes(channelToRem.id)) return interaction.replyErrorMessage(`This channel is not ignored.`);
            const index = settings.ignoreChannel.indexOf(channelToRem.id);
            settings.ignoreChannel.splice(index, 1);
            await settings.save();
            interaction.replySuccessMessage(`The channel ${channelToRem.name} is no longer ignored.`);
            break;
        case 'list':
            if (!settings.ignoreChannel || settings.ignoreChannel.length < 1) return interaction.replyErrorMessage(`There are no ignored channels for this guild.`)
            const embed = {
                title: `List of ignored channels for the server **${interaction.guild.name}** | ${settings.ignoreChannel.length} in total`,
                thumbnail: {
                    url: `${interaction.guild.iconURL()}`,
                },
                color: `${client.config.color.EMBEDCOLOR}`,
                description: null,
                fields: []
            };
            embed.description = `<#${settings.ignoreChannel.join('>, <#')}>`;
            interaction.reply({ embeds: [embed] });
            break;
    }
}
module.exports.help = {
    name: 'ignore',
    aliases: ['ignore'],
    category: 'other',
    description: 'Disable the bot in a channel.',
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
            args: [{
                name: 'channel',
                description: 'The channel',
                type: 'STRING',
                required: true
            }],
            exemples: ['#general', '710761432534351925']
        },
        {
            name: 'rem',
            description: 'Enable ignored channel for bot commands.',
            usage: '[channel]',
            args: [{
                name: 'channel',
                description: 'The channel',
                type: 'STRING',
                required: true
            }],
            exemples: ['#general', '710761432534351925']
        },
        {
            name: 'list',
            description: 'View ignore channels for bot commands.',
            usage: '',
            args: 0,
            exemples: []
        },
    ]
}
