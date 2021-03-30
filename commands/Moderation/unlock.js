module.exports.run = (client, message, args) => {
    if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) return message.channel.sendErrorMessage(`I don't have permission to change the channels.`);

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
    permissions: true,
    args: true,
    subcommands: []
};