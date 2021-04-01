module.exports.run = async (client, message, args) => {
    const channel = await client.resolveChannel(message.guild, args[0])
    if (channel) {
        client.updateGuild(message.guild, { modLogs: channel.id })
        message.channel.sendSuccessMessage(`The logs channel is now <#${channel.id}> .`)
    } else return message.channel.sendErrorMessage(`Channel not found.`)

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
    args: false,
    userPermissions: ['MANAGE_GUILD'],
    botPermissions: [],
    subcommands: []
}

