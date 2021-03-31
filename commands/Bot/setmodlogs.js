module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.sendErrorMessage(`You need MANAGE_GUILD permission for use this command.`)
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
    description: 'Choisis un channel de logs pour les commandes de modération.',
    cooldown: 5,
    usage: '<channel>',
    exemple: ['setmodlogs #logs'],
    permissions: false,
    isUserAdmin: false,
    args: false,
    subcommands: []
}

