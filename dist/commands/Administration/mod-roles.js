"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = __importDefault(require("../CommandClass"));
const discord_js_1 = require("discord.js");
class default_1 extends CommandClass_1.default {
    constructor(spiritus) {
        super(spiritus, {
            name: 'mod-roles',
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
            ],
        });
    }
    async execute(interaction, args, settings) {
        switch (interaction.subcommand) {
            case 'list':
                if (!settings.modRoles || settings.modRoles.length < 1)
                    return interaction.replyErrorMessage(`No mods roles on this server`);
                const embed = new discord_js_1.MessageEmbed()
                    .setTitle(`List of moderators roles on the guild **${interaction.guild.name}** | ${settings.modRoles.length} in total`);
                if (interaction.guild.iconURL())
                    embed.setThumbnail(interaction.guild.iconURL());
                embed.setColor(this.colors.embed);
                embed.setDescription('<@&' + settings.modRoles.join('>, <@&') + '>');
                interaction.reply({ embeds: [embed] });
                break;
            case 'add':
                const roleToAdd = this.util.resolveRole(interaction.guild, args.get('role').value);
                if (!roleToAdd)
                    return interaction.replyErrorMessage(`Role not found.`);
                if (settings.modRoles.includes(roleToAdd.id))
                    return interaction.replyErrorMessage(`This role is already a moderator.`);
                else {
                    await this.db.updateGuild(interaction.guildId, { $push: { modRoles: roleToAdd.id } });
                    interaction.replySuccessMessage(`This role is now a moderator.`);
                }
                break;
            case 'rem':
                const roleToRemove = this.util.resolveRole(interaction.guild, args.get('role').value);
                if (!roleToRemove)
                    return interaction.replyErrorMessage(`Role not found.`);
                if (!settings.modRoles.includes(roleToRemove.id))
                    return interaction.replyErrorMessage(`This role is not a moderator.`);
                await this.db.updateGuild(interaction.guildId, { $pull: { modRoles: roleToRemove.id } });
                interaction.replySuccessMessage(`The role \`${roleToRemove.name}\` no longer moderator.`);
                break;
        }
    }
}
exports.default = default_1;
