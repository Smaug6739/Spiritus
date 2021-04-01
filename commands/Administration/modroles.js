const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args, settings) => {

    switch (args[0].toLowerCase()) {
        case 'list':
            if (!settings.modRoles || settings.modRoles.length < 1) return message.channel.sendErrorMessage(`Il n'y a aucun roles modérateurs pour ce serveur. Pour en ajouter utilisez la commande \`${settings.prefix}modroles add @role\``)
            let embed = {
                title: `List of moderators roles on the guild **${message.guild.name}** | ${settings.modRoles.length} in total`,
                thumbnail: {
                    url: `${message.guild.iconURL()}`,
                },
                color: `${client.config.color.EMBEDCOLOR}`,
                description: null,
                fields: []
            };
            embed.description = '<@&' + settings.modRoles.join('>, <@&') + '>';
            message.channel.send({ embed });
            break;
        case 'add':
            const roleToAdd = client.resolveRole(message.guild, args[1]);
            if (!roleToAdd) return message.channel.sendErrorMessage(`Role not found.`);
            if (settings.modRoles.includes(roleToAdd.id)) return message.channel.sendErrorMessage(`This role is already a moderator.`);
            else {
                settings.modRoles.push(roleToAdd.id);
                await settings.save();
                message.channel.sendSuccessMessage(`This role is now a moderator.`);
            }
            break;
        case 'rem':
            const roleToRemove = client.resolveRole(message.guild, args[1]);
            if (!roleToRemove) return message.channel.sendErrorMessage(`Role not found.`);
            if (!settings.modRoles.includes(roleToRemove.id)) return message.channel.sendErrorMessage(`This role is not a moderator.`);
            const index = settings.modRoles.indexOf(roleToRemove.id);
            settings.modRoles.splice(index, 1);
            await settings.save();
            message.channel.sendSuccessMessage(`The role \`${roleToRemove.name}\` no longer moderator.`);
            break;
    }
}
module.exports.help = {
    name: 'modroles',
    aliases: ['modroles', 'moderators-roles'],
    category: 'administration',
    description: 'Manage moderator roles.',
    cooldown: 5,
    usage: '<action> <args>',
    exemple: ["modroles add @moderator"],
    moderator: false,
    isUserAdmin: false,
    args: false,
    userPermissions: ['ADMINISTRATOR'],
    botPermissions: [],
    subcommands: [
        {
            name: 'list',
            description: 'List of moderators roles on the guild.',
            usage: '',
            args: 0,
            exemples: []
        },
        {
            name: 'add',
            description: 'Add moderator role on the guild.',
            usage: '<role>',
            args: 1,
            exemples: ['@role']
        },
        {
            name: 'rem',
            description: 'Remove moderator role on the guild.',
            usage: '<role>',
            args: 1,
            exemples: ['@role']
        },
    ]
}
