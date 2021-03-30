module.exports.run = async (client, message, args, settings) => {
    if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.sendErrorMessage(`Vous devez avoir la permission de gérer le serveur pour utiliser cette commande.`);
    const newSetting = args[0]
    if (newSetting) {
        await client.updateGuild(message.guild, { prefix: newSetting });
        return message.channel.sendSuccessMessage(`Prefix mis a jour : \`${settings.prefix}\` ->\`${newSetting}\``)
    }
    message.channel.send(`Prefix actuel : \`${settings.prefix}\``);

};
module.exports.help = {

    name: "prefix",
    aliases: ['prefix'],
    category: 'bot',
    description: "Permet de changer le prefix du bot.",
    cooldown: 10,
    usage: '[paramètre] (valeur)',
    exemple: [],
    isUserAdmin: false,
    permissions: true,
    args: false,
    subcommands: []
}