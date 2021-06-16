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
const discord_js_1 = require("discord.js");
const CommandClass_1 = __importDefault(require("../CommandClass"));
class default_1 extends CommandClass_1.default {
    constructor(spiritus) {
        super(spiritus, {
            name: 'unlock',
            aliases: [],
            args: [
                {
                    name: 'user',
                    description: 'User for unmute',
                    type: 'STRING',
                    required: true
                },
            ],
            description: 'Unlock channel from the guild',
            category: 'Moderation',
            cooldown: 5,
            userPermissions: ['MODERATOR'],
            botPermissions: ['MANAGE_ROLES', 'MANAGE_MEMBERS'],
            subCommands: [],
        });
    }
    execute(interaction, args, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const argUser = args.get('user').value;
            const user = yield this.spiritus.util.resolveMember(interaction.guild, argUser);
            if (!user)
                return interaction.replyErrorMessage(`User not found.`);
            const muteRole = interaction.guild.roles.cache.find(r => r.name === 'Muted');
            if (!muteRole)
                return interaction.replyErrorMessage(`This user is not muted.`);
            if (!user.roles.cache.has(muteRole.id))
                return interaction.replyErrorMessage(`This user is not muted.`);
            user.roles.remove(muteRole.id);
            interaction.replySuccessMessage(`<@${user.id}> is now unmuted`);
            const embed = new discord_js_1.MessageEmbed()
                .setAuthor(`${user.user.username} (${user.id})`, user.user.displayAvatarURL())
                .setColor(this.spiritus.colors.green)
                .setDescription(`**Action**: unmute`)
                .setTimestamp()
                .setFooter(interaction.user.username, interaction.user.displayAvatarURL());
            if (settings.modLogs) {
                const channel = this.spiritus.util.resolveChannel(interaction.guild, settings.modLogs);
                if (channel && channel.permissionsFor(interaction.guild.me).has('SEND_MESSAGES'))
                    channel.send(embed);
            }
        });
    }
}
exports.default = default_1;
