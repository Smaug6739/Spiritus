module.exports.run = (client, message, args) => {
    if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) return message.channel.send(`${client.config.emojis.error}I don't have permission to update channels.`);


    let channel = client.resolveChannel(message.guild, args[0])
    if (channel == undefined) return message.channel.send(`${client.config.emojis.error}Channel not found.`)

    channel.updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: false
    })
        .then(message.channel.send(`${client.config.emojis.success}I have lock the channel ${channel}`))
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
    permissions: true,
    args: true,
    subcommands: []
};