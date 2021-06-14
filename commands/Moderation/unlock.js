module.exports.run = async (client, interaction, args) => {
    const argChannel = args.get('channel').value
    let channel = client.resolveChannel(interaction.guild, argChannel)
    if (channel == undefined) return interaction.replyErrorMessage(`Channel not found.`)

    await channel.updateOverwrite(interaction.guild.roles.everyone, {
        SEND_MESSAGES: true
    })
        .catch(() => interaction.replyErrorMessage('An error occurred. Please try again'));
    interaction.replySuccessMessage(`I have unlock the channel ${channel}`)

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
    args: [
        {
            name: 'channel',
            description: 'Channel to unlock',
            type: 'STRING',
            required: true
        },
    ],
    userPermissions: [],
    botPermissions: ['MANAGE_CHANNELS'],
    subcommands: []
};