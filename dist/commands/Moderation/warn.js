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
            name: 'warn',
            aliases: [],
            args: [
                {
                    name: 'user',
                    description: 'The user to warn',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'reason',
                    description: 'The reason of warn',
                    type: 'STRING',
                    required: false
                },
            ],
            description: 'Warn a user.',
            category: 'Moderation',
            cooldown: 5,
            userPermissions: ['MODERATOR'],
            botPermissions: [],
            subCommands: [],
        });
    }
    execute(interaction, args) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield this.spiritus.util.resolveMember(interaction.guild, args.get('user').value);
            if (!member)
                return interaction.replyErrorMessage('User not found.');
            const reason = ((_a = args.get('reason')) === null || _a === void 0 ? void 0 : _a.value) || 'No reason was provided.';
            const dmEmbed = new discord_js_1.MessageEmbed()
                .setTitle('Warn')
                .setColor(this.spiritus.colors.orange)
                .setAuthor(member.user.username, member.user.displayAvatarURL())
                .setThumbnail(member.user.displayAvatarURL())
                .setDescription(`**Action :** Warn\n**Reason :** ${reason}${reason.endsWith('.') ? '' : '.'}\n**Server :** ${interaction.guild.name}\n**Moderator :** ${interaction.user.username}`)
                .setTimestamp()
                .setFooter(`By : ${interaction.user.username}`, interaction.user.displayAvatarURL());
            try {
                yield member.send({ embeds: [dmEmbed] });
            }
            catch (_b) {
                return interaction.replyErrorMessage('I can\'t send a message to this user.');
            }
            interaction.replySuccessMessage(`I have successfully warn the user \`${member.user.tag}\`.`);
        });
    }
}
exports.default = default_1;
