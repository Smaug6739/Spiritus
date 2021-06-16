"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = __importDefault(require("../CommandClass"));
class default_1 extends CommandClass_1.default {
    constructor(spiritus) {
        super(spiritus, {
            name: 'role',
            aliases: [],
            args: [],
            description: 'Manage roles from the server.',
            category: 'Administration',
            cooldown: 5,
            userPermissions: ['MANAGE_ROLES', 'MANAGE_MEMBERS'],
            botPermissions: ['MANAGE_ROLES'],
            subCommands: [
                {
                    name: 'list',
                    description: 'View roles of the guild.',
                    usage: '',
                    args: [],
                },
                {
                    name: 'create',
                    description: 'Create role on the guild.',
                    args: [{
                            name: 'name',
                            description: 'Name of role',
                            type: 'STRING',
                            required: true
                        }],
                },
                {
                    name: 'update',
                    description: 'Update role on the guild.',
                    args: [
                        {
                            name: 'role',
                            description: 'Role to update.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'new_name',
                            description: 'New name of role',
                            type: 'STRING',
                            required: true
                        }
                    ],
                },
                {
                    name: 'delete',
                    description: 'Delete role on the guild.',
                    args: [
                        {
                            name: 'role',
                            description: 'Role to update.',
                            type: 'STRING',
                            required: true
                        },
                    ],
                },
                {
                    name: 'position',
                    description: 'Update position of role on the guild.',
                    args: [
                        {
                            name: 'role',
                            description: 'Role to update.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'position',
                            description: 'New position of role',
                            type: 'STRING',
                            required: true
                        }
                    ],
                },
                {
                    name: 'add',
                    description: 'Add role to a user.',
                    args: [
                        {
                            name: 'user',
                            description: 'User to add role.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'role',
                            description: 'Role to add',
                            type: 'STRING',
                            required: true
                        }
                    ],
                },
                {
                    name: 'rem',
                    description: 'Remove role to a user.',
                    usage: '<user> <role>',
                    args: [
                        {
                            name: 'user',
                            description: 'User to remove role.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'role',
                            description: 'Role to remove',
                            type: 'STRING',
                            required: true
                        }
                    ],
                },
            ],
        });
    }
    execute(interaction, args) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (interaction.subcommand) {
                case 'list':
                    const rolesListe = interaction.guild.roles.cache.map(role => role.toString());
                    const embed = {
                        title: `List of roles on the guild **${interaction.guild.name}** | ${rolesListe.length} in total`,
                        thumbnail: {
                            url: `${interaction.guild.iconURL()}`,
                        },
                        color: `${this.colors.embed}`,
                        description: '',
                        fields: []
                    };
                    if (rolesListe.join(' ').length > 2048) {
                        let i = '';
                        rolesListe.forEach(role => {
                            if (i.length <= 1024 && i.length + role.length > 1024)
                                embed.fields.push({ name: '\u200b', value: i, inline: true });
                            i = i.concat(' ', role);
                        });
                    }
                    else
                        embed.description = rolesListe.join(' ');
                    interaction.reply({ embeds: [embed] });
                    break;
                case 'create':
                    const roleCreateName = args.get('name').value;
                    if (roleCreateName.length > 99)
                        return interaction.replyErrorMessage(`The name must be inferior to 100 chars.`);
                    interaction.guild.roles.create({
                        name: roleCreateName,
                        reason: `Command by ${interaction.user.tag}.`
                    })
                        .then(role => interaction.replySuccessMessage(`I have created the role \`${role.name}\``))
                        .catch(console.error);
                    break;
                case 'update':
                    const roleToUpdate = this.util.resolveRole(interaction.guild, args.get('role').value);
                    if (!roleToUpdate)
                        return interaction.replyErrorMessage(`Role not found`);
                    if (interaction.guild.me.roles.highest.comparePositionTo(roleToUpdate) <= 0)
                        return interaction.replyErrorMessage(`Je n'ai pas un role sufisant pour modifier ce role.`);
                    const roleName = args.get('new_name').value;
                    if (roleName.length > 99)
                        return interaction.replyErrorMessage(`The name must be inferior to 100 chars.`);
                    yield roleToUpdate.edit({ name: `${roleName}` })
                        .then(() => interaction.replySuccessMessage(`I have updated the role \`${roleToUpdate.name}\` with \`${roleName}\``));
                    break;
                case 'delete':
                    const roleToDelete = this.util.resolveRole(interaction.guild, args.get('role').value);
                    if (!roleToDelete)
                        return interaction.replyErrorMessage(`Role not found`);
                    roleToDelete.delete();
                    interaction.replySuccessMessage(`I have deleted the role \`${roleToDelete.name}\``);
                    break;
                case 'position':
                    const role = this.util.resolveRole(interaction.guild, args.get('position').value);
                    if (!role)
                        return interaction.replyErrorMessage(`Role not found`);
                    const newPosition = args.get('position').value;
                    console.log(newPosition);
                    if (interaction.guild.me.roles.highest.comparePositionTo(role) <= 0)
                        return interaction.replyErrorMessage(`I do not have a role sufficient to modify this role.`);
                    if (interaction.guild.me.roles.highest.rawPosition <= newPosition)
                        return interaction.replyErrorMessage(`I do not have a role sufficient to put this role so high.`);
                    if (interaction.member.roles.highest.comparePositionTo(role) <= 0)
                        return interaction.replyErrorMessage(`You do not have a role sufficient to modify this role.`);
                    if (isNaN(newPosition))
                        return interaction.replyErrorMessage(`Please indicate the new position of the role as a number.`);
                    interaction.guild.setRolePositions([{ role: role, position: newPosition }]).then(() => interaction.replySuccessMessage(`I have updated the role \`${role.name}\``));
                    break;
                case 'add':
                    const userToAdd = (yield this.util.resolveMember(interaction.guild, args.get('user').value)) || interaction.member;
                    const roleToAdd = this.util.resolveRole(interaction.guild, args.get('role').value);
                    if (!roleToAdd)
                        return interaction.replyErrorMessage(`Role not found`);
                    if (interaction.guild.me.roles.highest.comparePositionTo(roleToAdd) <= 0)
                        return interaction.replyErrorMessage(`I do not have a sufficient role to give you this role.`);
                    if (interaction.member.roles.highest.comparePositionTo(roleToAdd) <= 0)
                        return interaction.replyErrorMessage(`You cannot add a higher role to your highest role.`);
                    if (userToAdd.roles.cache.has(roleToAdd.id))
                        return interaction.replyErrorMessage(`The user already have this role.`);
                    userToAdd.roles.add(roleToAdd)
                        .then(() => interaction.replySuccessMessage(`I have add the role \`${roleToAdd.name}\` to ${userToAdd}.`))
                        .catch((e) => console.log(e));
                    break;
                case 'rem':
                    const userToRem = (yield this.util.resolveMember(interaction.guild, args.get('user').value)) || interaction.member;
                    const roleToRemove = this.util.resolveRole(interaction.guild, args.get('role').value);
                    if (!roleToRemove)
                        return interaction.replyErrorMessage(`Role not found`);
                    if (interaction.guild.me.roles.highest.comparePositionTo(roleToRemove) <= 0)
                        return interaction.replyErrorMessage(`I do not have a sufficient role to remove this role from you`);
                    if (interaction.member.roles.highest.comparePositionTo(roleToRemove) <= 0)
                        return interaction.replyErrorMessage(`You cannot remove a role greater than or equal to your highest role.`);
                    if (!userToRem.roles.cache.has(roleToRemove.id))
                        return interaction.replyErrorMessage(`The user does not have this role.`);
                    userToRem.roles.remove(roleToRemove)
                        .then(() => interaction.replySuccessMessage(`I have removed the role \`${roleToRemove.name}\` of \`${userToRem.user.username}\`.`))
                        .catch((e) => console.log(e));
                    break;
            }
        });
    }
}
exports.default = default_1;
