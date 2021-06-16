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
    execute(interaction, args, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (interaction.subcommand) {
                case 'list':
                    if (!settings.modRoles || settings.modRoles.length < 1)
                        return interaction.replyErrorMessage(`Il n'y a aucun roles modérateurs pour ce serveur. Pour en ajouter utilisez la commande \`${settings.prefix}modroles add @role\``);
                    const embed = {
                        title: `List of moderators roles on the guild **${interaction.guild.name}** | ${settings.modRoles.length} in total`,
                        thumbnail: {
                            url: `${interaction.guild.iconURL()}`,
                        },
                        color: `${this.colors.embed}`,
                        description: '',
                        fields: []
                    };
                    embed.description = '<@&' + settings.modRoles.join('>, <@&') + '>';
                    interaction.reply({ embeds: [embed] });
                    break;
                case 'add':
                    const roleToAdd = this.util.resolveRole(interaction.guild, args.get('role').value);
                    if (!roleToAdd)
                        return interaction.replyErrorMessage(`Role not found.`);
                    if (settings.modRoles.includes(roleToAdd.id))
                        return interaction.replyErrorMessage(`This role is already a moderator.`);
                    else {
                        yield this.db.updateGuild(interaction.guildID, { $push: { modRoles: roleToAdd.id } });
                        interaction.replySuccessMessage(`This role is now a moderator.`);
                    }
                    break;
                case 'rem':
                    const roleToRemove = this.util.resolveRole(interaction.guild, args.get('role').value);
                    if (!roleToRemove)
                        return interaction.replyErrorMessage(`Role not found.`);
                    if (!settings.modRoles.includes(roleToRemove.id))
                        return interaction.replyErrorMessage(`This role is not a moderator.`);
                    yield this.db.updateGuild(interaction.guildID, { $pull: { modRoles: roleToRemove.id } });
                    interaction.replySuccessMessage(`The role \`${roleToRemove.name}\` no longer moderator.`);
                    break;
            }
        });
    }
}
exports.default = default_1;
