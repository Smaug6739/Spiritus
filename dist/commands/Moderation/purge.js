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
            name: 'purge',
            aliases: [],
            args: [
                {
                    name: 'A',
                    description: 'D',
                    type: 'STRING',
                    required: true
                },
            ],
            description: 'Purge messages from channel.',
            category: 'Moderation',
            cooldown: 5,
            userPermissions: ['MODERATOR'],
            botPermissions: ['MANAGE_MESSAGES', 'MANAGE_CHANNELS'],
            subCommands: [
                {
                    name: 'channel',
                    description: 'Fully purge a channel.',
                    usage: '',
                    args: [
                        {
                            name: 'channel',
                            description: 'Channel to purge.',
                            type: 'STRING',
                            required: false
                        }
                    ],
                },
                {
                    name: 'messages',
                    description: 'Delete messages in a channel.',
                    args: [
                        {
                            name: 'number',
                            description: 'Number of messages',
                            type: 'STRING',
                            required: true
                        }
                    ],
                },
                {
                    name: 'user',
                    description: 'Purge messages from single user.',
                    args: [
                        {
                            name: 'user',
                            description: 'User',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'number',
                            description: 'Number of messages',
                            type: 'STRING',
                            required: true
                        }
                    ],
                }
            ],
        });
    }
    execute(interaction, args) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            switch (interaction.subcommand) {
                case 'channel':
                    const textChannel = this.spiritus.util.resolveChannel(interaction.guild, (_a = args.get('channel')) === null || _a === void 0 ? void 0 : _a.value) || interaction.channel;
                    textChannel.clone().then(interaction.channel.delete());
                    break;
                case 'messages':
                    const channelTextMessages = interaction.channel;
                    const messagesToDelete = yield interaction.channel.messages.fetch({
                        limit: Math.min(args.get('number').value, 100),
                        before: interaction.id
                    });
                    const embedMessages = new discord_js_1.MessageEmbed()
                        .setAuthor(interaction.user.username, interaction.user.displayAvatarURL())
                        .setColor(this.spiritus.colors.red)
                        .setDescription(`**Action**: purge\n**Messages**: ${args.get('number').value}\n**Channel**: ${interaction.channel}`)
                        .setTimestamp();
                    channelTextMessages.bulkDelete(messagesToDelete)
                        .then(() => {
                        interaction.reply({ embeds: [embedMessages] }).then(() => {
                            setTimeout(function () {
                                interaction.deleteReply();
                            }, 3000);
                        });
                    })
                        .catch((err) => {
                        if (err.message.match('You can only bulk delete messages that are under 14 days old'))
                            interaction.replyErrorMessage(`You cannot delete messages older than 14 days.`);
                        else
                            interaction.replyErrorMessage(`An error occurred. Please try again.`);
                        console.error(err);
                    });
                    break;
                case 'user':
                    const argNumber = args.get('number').value;
                    const channelTextUser = interaction.channel;
                    const user = yield this.spiritus.util.resolveMember(interaction.guild, args.get('user').value);
                    if (isNaN(argNumber) || (argNumber < 1 || argNumber > 100))
                        return interaction.replyErrorMessage(`You must specify a number between 1 and 100.`);
                    const messagesOfUser = (yield interaction.channel.messages.fetch({
                        limit: 100,
                        before: interaction.id,
                    })).filter(a => a.author.id === user.id).array();
                    messagesOfUser.length = Math.min(argNumber, messagesOfUser.length);
                    if (messagesOfUser.length === 0 || !user)
                        return interaction.replyErrorMessage(`No message to delete`);
                    if (messagesOfUser.length === 1)
                        yield messagesOfUser[1].delete();
                    else
                        yield channelTextUser.bulkDelete(messagesOfUser);
                    interaction.deleteReply();
                    const embedLogs = new discord_js_1.MessageEmbed()
                        .setAuthor(interaction.user.username, interaction.user.displayAvatarURL())
                        .setColor(this.spiritus.colors.red)
                        .setDescription(`**Action**: prune\n**Messages**: ${argNumber}\n**User**: ${user}`);
                    interaction.reply({ embeds: [embedLogs] });
                    break;
            }
        });
    }
}
exports.default = default_1;
