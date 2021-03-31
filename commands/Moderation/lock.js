module.exports.run = (client, message, args) => {


    let channel = client.resolveChannel(message.guild, args[0])
    if (channel == undefined) return message.channel.sendErrorMessage(`Channel not found.`)

    channel.updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: false
    })
        .then(message.channel.sendSuccessMessage(`I have lock the channel ${channel}`))
        .catch(console.error);

}

module.exports.help = {
    name: "lock",
    aliases: ['lock'],
    category: 'moderation',
    description: "Lock a channel.",
    cooldown: 10,
    usage: '<#channel> ou <710761432534351925>',
    exemple: ["lock #general"],
    isUserAdmin: false,
    moderator: true,
    args: true,
    userPermissions: [],
    botPermissions: ['MANAGE_CHANNELS'],
    subcommands: []
};