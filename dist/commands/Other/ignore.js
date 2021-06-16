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
class Ping extends CommandClass_1.default {
    constructor(spiritus) {
        super(spiritus, {
            name: 'ignore',
            aliases: [],
            args: [],
            description: 'Ignore channel for the bot.',
            category: 'Other',
            cooldown: 5,
            userPermissions: ['MANAGE_MESSAGES'],
            botPermissions: [],
            subCommands: [
                {
                    name: 'add',
                    description: 'Ignore a channel for bot commands.',
                    args: [{
                            name: 'channel',
                            description: 'The channel',
                            type: 'STRING',
                            required: true
                        }],
                },
                {
                    name: 'rem',
                    description: 'Enable ignored channel for bot commands.',
                    args: [{
                            name: 'channel',
                            description: 'The channel',
                            type: 'STRING',
                            required: true
                        }],
                },
                {
                    name: 'list',
                    description: 'View ignore channels for bot commands.',
                    usage: '',
                    args: [],
                },
            ],
        });
    }
    execute(interaction, args, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (interaction.subcommand) {
                case 'add':
                    const channelToAdd = yield this.spiritus.util.resolveChannel(interaction.guild, args.get('channel').value);
                    if (!channelToAdd)
                        return interaction.replyErrorMessage(`Channel not found.`);
                    else {
                        settings.ignoreChannel.push(channelToAdd.id);
                        yield this.spiritus.db.updateGuild(interaction.guild.id, { $push: { ignoreChannel: channelToAdd.id } });
                        interaction.replySuccessMessage(`This channel is now ignored.`);
                    }
                    break;
                case 'rem':
                    const channelToRem = this.spiritus.util.resolveChannel(interaction.guild, args.get('channel').value);
                    if (!channelToRem)
                        return interaction.replyErrorMessage(`Channel not found.`);
                    if (!settings.ignoreChannel.includes(channelToRem.id))
                        return interaction.replyErrorMessage(`This channel is not ignored.`);
                    yield this.spiritus.db.updateGuild(interaction.guild.id, { $pull: { ignoreChannel: channelToRem.id } });
                    interaction.replySuccessMessage(`The channel ${channelToRem.name} is no longer ignored.`);
                    break;
                case 'list':
                    if (!settings.ignoreChannel || settings.ignoreChannel.length < 1)
                        return interaction.replyErrorMessage(`There are no ignored channels for this guild.`);
                    const embed = {
                        title: `List of ignored channels for the server **${interaction.guild.name}** | ${settings.ignoreChannel.length} in total`,
                        thumbnail: {
                            url: `${interaction.guild.iconURL()}`,
                        },
                        color: `${this.spiritus.colors.embed}`,
                        description: '',
                        fields: []
                    };
                    embed.description = `<#${settings.ignoreChannel.join('>, <#')}>`;
                    interaction.reply({ embeds: [embed] });
                    break;
            }
        });
    }
}
exports.default = Ping;
