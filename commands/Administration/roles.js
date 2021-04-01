const { MessageEmbed } = require("discord.js")
module.exports.run = async (client, message, args, settings) => {
    switch (args[0].toLowerCase()) {
        case 'list':
            const rolesListe = message.channel.guild.roles.cache.map(role => role.toString());
            let embed = {
                title: `List of roles on the guild **${message.guild.name}** | ${rolesListe.length} in total`,
                thumbnail: {
                    url: `${message.guild.iconURL()}`,
                },
                color: `${client.config.color.EMBEDCOLOR}`,
                description: null,
                fields: []
            };
            if (rolesListe.join(' ').length > 2048) {
                let i = '';
                rolesListe.forEach(role => {
                    if (i.length <= 1024 && i.length + role.length > 1024) embed.fields.push({ name: '\u200b', value: i, inline: true });
                    i = i.concat(' ', role);
                });
            } else embed.description = rolesListe.join(' ');
            message.channel.send({ embed });
            break;
        case 'create':
            let role_name = (args.splice(1).join(' ') || 'new role');
            if (role_name.length > 99) return message.channel.sendErrorMessage(`The name must be inferior to 100 chars.`);
            message.guild.roles.create({
                data: {
                    name: role_name
                }
            })
                .then(role => message.channel.sendSuccessMessage(`I have created the role ${role}`))
                .catch(console.error);
            break;
        case 'update':
            const roleToUpdate = client.resolveRole(message.guild, args[1])
            if (roleToUpdate == undefined) return message.channel.sendErrorMessage(`Role not found`)
            if (message.guild.me.roles.highest.comparePositionTo(roleToUpdate) <= 0) return message.channel.sendErrorMessage(`Je n'ai pas un role sufisant pour modifier ce role.`)

            const roleName = args.slice(2).join(" ") || 'new role'
            if (roleName.length > 99) return message.channel.sendErrorMessage(`The name must be inferior to 100 chars.`);
            await roleToUpdate.edit({ name: `${roleName}` }).then(
                message.channel.sendSuccessMessage(`J'ai bien mis a jour le role \`${roleToUpdate.name}\` par \`${roleName}\``))
            break;
        case 'delete':
            const roleToDelete = client.resolveRole(message.guild, args[1])
            if (roleToDelete == undefined) return message.channel.sendErrorMessage(`Role not found`)
            message.channel.sendSuccessMessage(`J'ai bien supprimer le role \`${roleToDelete.name}\``).then(
                roleToDelete.delete())
            break;
        case 'position':
            let role = client.resolveRole(message.guild, args[1])
            if (role == undefined) return message.channel.sendErrorMessage(`Role not found`)
            let newPosition = args.slice(1).join('')
            newPosition = newPosition.split(role)
            newPosition = newPosition.join(' ')
            newPosition = Number(newPosition)
            console.log(newPosition)
            if (message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.sendErrorMessage(`I do not have a role sufficient to modify this role.`)
            if (message.guild.me.roles.highest.rawPosition <= newPosition) return message.channel.sendErrorMessage(`I do not have a role sufficient to put this role so high.`)
            if (message.member.roles.highest.comparePositionTo(role) <= 0) return message.channel.sendErrorMessage(`You do not have a role sufficient to modify this role.`)
            if (isNaN(newPosition)) return message.channel.sendErrorMessage(`Please indicate the new position of the role as a number.`)
            message.guild.setRolePositions([{ role: role, position: newPosition }]).then(message.channel.sendSuccessMessage(`I have updated the role \`${role.name}\``))
            break;
        case 'add':
            const userToAdd = await client.resolveMember(message.guild, args[1]) || message.member;
            const roleToAdd = client.resolveRole(message.guild, args[2]) || message.mentions.roles.first()
            if (!roleToAdd) return message.channel.sendErrorMessage(`Role not found`)
            if (roleToAdd) {
                if (message.guild.me.roles.highest.comparePositionTo(roleToAdd) <= 0) return message.channel.sendErrorMessage(`I do not have a sufficient role to give you this role.`)
                if (message.member.roles.highest.comparePositionTo(roleToAdd) <= 0) {
                    return message.channel.sendErrorMessage(`You cannot add a higher role to your highest role.`);
                } else {
                    if (userToAdd.roles.cache.has(roleToAdd.id)) return message.channel.sendErrorMessage(`The user already have this role.`);
                    userToAdd.roles.add(roleToAdd)
                        .then(() => message.channel.sendSuccessMessage(`I have add the role \`${roleToAdd.name}\` to ${userToAdd}.`))
                        .catch(e => console.log(e));
                }
            } else message.channel.sendErrorMessage(`Role not found`);
            break;
        case 'rem':
            if (args[0].toLowerCase() === 'rem') {
                const userToRem = await client.resolveMember(message.guild, args[1]) || message.member
                const roleToRemove = client.resolveRole(message.guild, args[2]) || message.mentions.roles.first()
                if (!roleToRemove) return message.channel.sendErrorMessage(`Role not found`)
                if (roleToRemove) {
                    if (message.guild.me.roles.highest.comparePositionTo(roleToRemove) <= 0) return message.channel.sendErrorMessage(`I do not have a sufficient role to remove this role from you`)
                    if (message.member.roles.highest.comparePositionTo(roleToRemove) <= 0) {
                        return message.channel.sendErrorMessage(`You cannot remove a role greater than or equal to your highest role.`);
                    } else {
                        if (!userToRem.roles.cache.has(roleToRemove.id)) return message.channel.sendErrorMessage(`The user does not have this role.`);
                        userToRem.roles.remove(roleToRemove)
                            .then(() => message.channel.sendSuccessMessage(`I have removed the role \`${roleToRemove.name}\` of \`${userToRem.user.username}\`.`))
                            .catch(e => console.log(e));
                    }
                } else message.channel.sendErrorMessage(`Role not found`);
            }
            break;
    }



}
module.exports.help = {
    name: 'roles',
    aliases: ['roles', 'role'],
    category: 'administration',
    description: 'Manage and add/rem roles.',
    cooldown: 5,
    usage: '<action> <args>',
    exemple: ["roles create Admin"],
    moderator: false,
    isUserAdmin: false,
    args: false,
    userPermissions: ['MANAGE_ROLES'],
    botPermissions: ['MANAGE_ROLES'],
    subcommands: [
        {
            name: 'list',
            description: 'View roles of the guild.',
            usage: '',
            args: 0,
            exemples: []
        },
        {
            name: 'create',
            description: 'Create role on the guild.',
            usage: '<name>',
            args: 1,
            exemples: ['helpers']
        },
        {
            name: 'update',
            description: 'Update role on the guild.',
            usage: '<role> <name>',
            args: 2,
            exemples: ['@admins staff']
        },
        {
            name: 'delete',
            description: 'Delete role on the guild.',
            usage: '<role>',
            args: 1,
            exemples: ['@staff']
        },
        {
            name: 'position',
            description: 'Update position of role on the guild.',
            usage: '<role> <position>',
            args: 2,
            exemples: ['@role 5']
        },
        {
            name: 'add',
            description: 'Add role to a user.',
            usage: '<user> <role>',
            args: 2,
            exemples: ['@Smaug admin']
        },
        {
            name: 'rem',
            description: 'Remove role to a user.',
            usage: '<user> <role>',
            args: 2,
            exemples: ['@Smaug admin']
        },
    ]
}
