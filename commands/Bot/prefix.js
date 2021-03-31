module.exports.run = async (client, message, args, settings) => {
    if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.sendErrorMessage(`You need MANAGE_GUILD permission for use this command.`)
    const newSetting = args[0]
    if (newSetting) {
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
    permissions: true,
    args: true,
    subcommands: []
}