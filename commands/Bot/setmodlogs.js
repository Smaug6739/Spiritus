module.exports.run = async (client, interaction, args) => {
    const channel = await client.resolveChannel(interaction.guild, args[0])
    if (channel) {
        client.updateGuild(interaction.guild, { modLogs: channel.id })
        interaction.replySuccessMessage(`The logs channel is now <#${channel.id}> .`)
    } else return interaction.replyErrorMessage(`Channel not found.`)

}
module.exports.help = {
    name: 'setmodlogs',
    aliases: ['setmodlogs'],
    category: 'bot',
    description: 'Choose a log channel for moderation commands.',
    cooldown: 5,
    usage: '<channel>',
    exemple: ['setmodlogs #logs'],
    moderator: false,
    isUserAdmin: false,
    args: [
        {
            name: 'channel',
            description: 'The mods log channel',
            type: 'STRING',
            required: true
        },
    ],
    userPermissions: ['MANAGE_GUILD'],
    botPermissions: [],
    subcommands: []
}

