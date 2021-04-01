module.exports.run = async (client, message, args, settings) => {
    const newSetting = args[0]
    if (newSetting) {
        if (newSetting.length > 5) return message.channel.sendErrorMessage(`Prefix is too long (max 5 chars).`)
        await client.updateGuild(message.guild, { prefix: newSetting });
        return message.channel.sendSuccessMessage(`Prefix updated : \`${settings.prefix}\` ->\`${newSetting}\``)
    }
    message.channel.send(`Currently prefix: \`${settings.prefix}\``);

};
module.exports.help = {

    name: "prefix",
    aliases: ['prefix'],
    category: 'bot',
    description: "Change prefix of the bot.",
    cooldown: 10,
    usage: '<new_prefix>',
    exemple: ['!'],
    isUserAdmin: false,
    moderator: false,
    args: true,
    userPermissions: ['MANAGE_GUILD'],
    botPermissions: [],
    subcommands: []
}