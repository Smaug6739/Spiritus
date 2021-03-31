module.exports.run = (client, message, args) => {

    let channel = client.resolveChannel(message.guild, args[0])
    if (channel == undefined) return message.channel.sendErrorMessage(`Channel not found.`)

    channel.updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: true
    })
        .then(message.channel.sendSuccessMessage(`I have unlock the channel ${channel}`))
        .catch(console.error);

}

module.exports.help = {
    name: "unlock",
    aliases: ['unlock'],
    category: 'moderation',
    description: "Unlock a channel.",
    cooldown: 5,
    usage: '<channel>',
    exemple: ["unlock #general"],
    isUserAdmin: false,
    moderator: true,
    args: true,
    userPermissions: [],
    botPermissions: ['MANAGE_CHANNELS'],
    subcommands: []
};