module.exports.run = async (client, interaction, args) => {
    const argChannel = client.getArg(args, 'channel')
    let channel = client.resolveChannel(interaction.guild, argChannel)
    if (channel == undefined) return interaction.replyErrorMessage(`Channel not found.`)
    await channel.updateOverwrite(interaction.guild.roles.everyone, {
        SEND_MESSAGES: false
    })
        .catch(() => interaction.replyErrorMessage(`An error occurred. Please try again.`));
    interaction.replySuccessMessage(`I have lock the channel ${channel}`)

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
    args: [
        {
            name: 'channel',
            description: 'Channel to lock',
            type: 'STRING',
            required: true
        },
    ],
    userPermissions: [],
    botPermissions: ['MANAGE_CHANNELS'],
    subcommands: []
};