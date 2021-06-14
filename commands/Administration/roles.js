module.exports.run = async (client, interaction, args) => {
    switch (args[0].toLowerCase()) {
        case 'list':
            const rolesListe = interaction.guild.roles.cache.map(role => role.toString());
            let embed = {
                title: `List of roles on the guild **${interaction.guild.name}** | ${rolesListe.length} in total`,
                thumbnail: {
                    url: `${interaction.guild.iconURL()}`,
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
            interaction.reply({ embed });
            break;
        case 'create':
            const roleName = args.get('name').value;
            if (roleName.length > 99) return interaction.replyErrorMessage(`The name must be inferior to 100 chars.`);
            interaction.guild.roles.create({
                data: {
                    name: roleName
                }
            })
                .then(role => interaction.replySuccessMessage(`I have created the role \`${role.name}\``))
                .catch(console.error);
            break;
        case 'update':
            const roleToUpdate = client.resolveRole(interaction.guild, args.get('role').value)
            if (!roleToUpdate) return interaction.replyErrorMessage(`Role not found`)
            if (interaction.guild.me.roles.highest.comparePositionTo(roleToUpdate) <= 0) return interaction.replyErrorMessage(`Je n'ai pas un role sufisant pour modifier ce role.`)
            const roleName = args.get('new_name').value;
            if (roleName.length > 99) return interaction.replyErrorMessage(`The name must be inferior to 100 chars.`);
            await roleToUpdate.edit({ name: `${roleName}` })
                .then(() => interaction.replySuccessMessage(`I have updated the role \`${roleToUpdate.name}\` with \`${roleName}\``))
            break;
        case 'delete':
            const roleToDelete = client.resolveRole(interaction.guild, args.get('role').value)
            if (!roleToDelete) return interaction.replyErrorMessage(`Role not found`);
            roleToDelete.delete()
            interaction.replySuccessMessage(`I have deleted the role \`${roleToDelete.name}\``)
            break;
        case 'position':
            const role = client.resolveRole(interaction.guild, args[1])
            if (!role) return interaction.replyErrorMessage(`Role not found`)
            const newPosition = args.get('position').value
            console.log(newPosition)
            if (interaction.guild.me.roles.highest.comparePositionTo(role) <= 0) return interaction.replyErrorMessage(`I do not have a role sufficient to modify this role.`)
            if (interaction.guild.me.roles.highest.rawPosition <= newPosition) return interaction.replyErrorMessage(`I do not have a role sufficient to put this role so high.`)
            if (interaction.member.roles.highest.comparePositionTo(role) <= 0) return interaction.replyErrorMessage(`You do not have a role sufficient to modify this role.`)
            if (isNaN(newPosition)) return interaction.replyErrorMessage(`Please indicate the new position of the role as a number.`)
            interaction.guild.setRolePositions([{ role: role, position: newPosition }]).then(interaction.replySuccessMessage(`I have updated the role \`${role.name}\``))
            break;
        case 'add':
            const userToAdd = await client.resolveMember(interaction.guild, args[1]) || interaction.member;
            const roleToAdd = client.resolveRole(interaction.guild, args[2]);
            if (!roleToAdd) return interaction.replyErrorMessage(`Role not found`)
            if (interaction.guild.me.roles.highest.comparePositionTo(roleToAdd) <= 0) return interaction.replyErrorMessage(`I do not have a sufficient role to give you this role.`)
            if (interaction.member.roles.highest.comparePositionTo(roleToAdd) <= 0) return interaction.replyErrorMessage(`You cannot add a higher role to your highest role.`);
            if (userToAdd.roles.cache.has(roleToAdd.id)) return interaction.replyErrorMessage(`The user already have this role.`);
            userToAdd.roles.add(roleToAdd)
                .then(() => interaction.replySuccessMessage(`I have add the role \`${roleToAdd.name}\` to ${userToAdd}.`))
                .catch(e => console.log(e));
            break;
        case 'rem':
            const userToRem = await client.resolveMember(interaction.guild, args[1]) || interaction.member
            const roleToRemove = client.resolveRole(interaction.guild, args[2]);
            if (!roleToRemove) return interaction.replyErrorMessage(`Role not found`)
            if (interaction.guild.me.roles.highest.comparePositionTo(roleToRemove) <= 0) return interaction.replyErrorMessage(`I do not have a sufficient role to remove this role from you`)
            if (interaction.member.roles.highest.comparePositionTo(roleToRemove) <= 0) return interaction.replyErrorMessage(`You cannot remove a role greater than or equal to your highest role.`);
            if (!userToRem.roles.cache.has(roleToRemove.id)) return interaction.replyErrorMessage(`The user does not have this role.`);
            userToRem.roles.remove(roleToRemove)
                .then(() => interaction.replySuccessMessage(`I have removed the role \`${roleToRemove.name}\` of \`${userToRem.user.username}\`.`))
                .catch(e => console.log(e));
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
