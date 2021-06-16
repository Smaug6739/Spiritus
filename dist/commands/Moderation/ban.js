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
            name: 'ban',
            aliases: [],
            args: [
                {
                    name: 'user',
                    description: 'User to be banned',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'reason',
                    description: 'The reason of ban',
                    type: 'STRING',
                    required: false
                },
            ],
            description: 'D',
            category: 'C',
            cooldown: 5,
            userPermissions: [],
            botPermissions: ['BAN_MEMBERS'],
            subCommands: [],
        });
    }
    execute(interaction, args, settings) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const argReason = ((_a = args.get('reason')) === null || _a === void 0 ? void 0 : _a.value) || 'No reason was provided.';
            const argUser = args.get('user').value;
            const user = yield this.spiritus.util.resolveMember(interaction.guild, argUser);
            if (!user)
                return interaction.replyErrorMessage(`User not found.`);
            const embed = new discord_js_1.MessageEmbed()
                .setAuthor(`${user.username} (${user.id})`)
                .setColor(this.spiritus.colors.red)
                .setDescription(`**Action**: ban\n**Reason**: ${argReason}\n**Guild :** ${interaction.guild.name}\nModerator : ${interaction.user.username}`)
                .setThumbnail(user.user.displayAvatarURL())
                .setTimestamp()
                .setFooter(interaction.user.username, interaction.user.displayAvatarURL());
            if (user.bannable) {
                try {
                    yield user.send(embed);
                }
                finally {
                    user.ban({ reason: argReason }).then(() => {
                        interaction.reply({ embeds: [embed] })
                            .then(() => {
                            setTimeout(() => {
                                interaction.deleteReply();
                            }, 5000);
                        });
                        if (settings.modLogs) {
                            const channel = this.spiritus.util.resolveChannel(interaction.guild, settings.modLogs);
                            if (channel && channel.permissionsFor(interaction.guild.me).has('SEND_MESSAGES'))
                                channel.send({ embeds: embed });
                        }
                    });
                }
            }
            else
                interaction.replyErrorMessage(`I can't ban this user.`);
        });
    }
}
exports.default = default_1;
