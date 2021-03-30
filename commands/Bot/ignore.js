const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args, settings) => {
    if (!args[0]) {
        const embed = new MessageEmbed()
            .setTitle('Commande ignore')
            .setDescription(`La commande __ignore__ permet de gérer les salons ignorés par le bot graces aux sous commandes suivantes :\n\n${client.config.emojis.fleche}__ignore add__ permet d'ignorer un salon pour le serveur.\n${client.config.emojis.fleche}__ignore rem__ permet de supprimer un salon ignoré du serveur.\n${client.config.emojis.fleche}__ignore liste__ permet de voir la liste des salons ignorés du serveur.`)
            .setColor(`${client.config.color.EMBEDCOLOR}`)
            .setTimestamp()
            .setFooter(`BOR ID : ${client.user.id}`)
        return message.channel.send(embed)
    }
    if (args[0].toLowerCase() === 'add') {
        if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.sendErrorMessage(`Vous devez avoir la permission de gérer le serveur pour utiliser cette commande.`);
        const channel = await client.resolveChannel(message.guild, args[1])
        if (!channel || channel == undefined) return message.channel.sendErrorMessage(`Je n'ai pas trouver ce channel.`)
        else {
            settings.ignoreChannel.push(channel.id);
            await settings.save();
            return message.channel.sendSuccessMessage(`Ce channel sera maintanant ignorer.`);
        }
    }
    if (args[0].toLowerCase() === 'rem') {
        if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.sendErrorMessage(`Vous devez avoir la permission de gérer le serveur pour utiliser cette commande.`);
        const channel = client.resolveChannel(message.guild, args[1]);
        if (!channel) return message.channel.sendErrorMessage(`Je n'ai pas trouver ce channel.`);
        if (!settings.ignoreChannel.includes(channel.id)) return message.channel.sendErrorMessage(`Ce channel n'est pas ignoré.`);
        const index = settings.ignoreChannel.indexOf(channel.id);
        settings.ignoreChannel.splice(index, 1);
        await settings.save();
        return message.channel.sendSuccessMessage(`Le channel ${channel.name} n'est plus ignoré.`);
    }
    if (args[0].toLowerCase() === 'liste') {
        if (!settings.ignoreChannel || settings.ignoreChannel.length < 1) return message.channel.sendErrorMessage(`Il n'y a aucun channels ignorés pour ce serveur. Pour en ajouter utilisez la commande \`${settings.prefix}ignore add @role\``)
        if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.sendErrorMessage(`Vous devez avoir la permission de gérer le serveur pour utiliser cette commande.`);
        let embed = {
            title: `Liste des channels ignorés pour le serveur **${message.guild.name}** | ${settings.ignoreChannel.length} au totale`,
            thumbnail: {
                url: `${message.guild.iconURL()}`,
            },
            color: `${client.config.color.EMBEDCOLOR}`,
            description: null,
            fields: []
        };
        embed.description = `<#${settings.ignoreChannel.join('>, <#')}>`;//'<#'+settings.ignoreChannel.join('')+'>';
        return message.channel.send({ embed });
    }
}
module.exports.help = {
    name: 'ignore',
    aliases: ['ignore'],
    category: 'bot',
    description: 'Desactive le bot dans un channel.',
    cooldown: 5,
    usage: '<action> <args>',
    exemple: ["ignore add @Channel"],
    permissions: false,
    isUserAdmin: false,
    args: false,
    subcommands: ["ignore add", "ignore rem", "ignore liste"]
}
