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
    async execute(interaction, args, settings) {
        switch (interaction.subcommand) {
            case 'add':
                const channelToAdd = await this.spiritus.util.resolveChannel(interaction.guild, args.get('channel').value);
                if (!channelToAdd)
                    return interaction.replyErrorMessage(`Channel not found.`);
                else {
                    settings.ignoreChannel.push(channelToAdd.id);
                    await this.spiritus.db.updateGuild(interaction.guild.id, { $push: { ignoreChannel: channelToAdd.id } });
                    interaction.replySuccessMessage(`This channel is now ignored.`);
                }
                break;
            case 'rem':
                const channelToRem = this.spiritus.util.resolveChannel(interaction.guild, args.get('channel').value);
                if (!channelToRem)
                    return interaction.replyErrorMessage(`Channel not found.`);
                if (!settings.ignoreChannel.includes(channelToRem.id))
                    return interaction.replyErrorMessage(`This channel is not ignored.`);
                await this.spiritus.db.updateGuild(interaction.guild.id, { $pull: { ignoreChannel: channelToRem.id } });
                interaction.replySuccessMessage(`The channel ${channelToRem.name} is no longer ignored.`);
                break;
            case 'list':
                if (!settings.ignoreChannel || settings.ignoreChannel.length < 1)
                    return interaction.replyErrorMessage(`There are no ignored channels for this guild.`);
                const embed = new discord_js_1.MessageEmbed()
                    .setTitle(`List of ignored channels for the server **${interaction.guild.name}** | ${settings.ignoreChannel.length} in total`);
                if (interaction.guild.iconURL())
                    embed.setThumbnail(interaction.guild.iconURL());
                embed.setColor(this.colors.embed);
                embed.setDescription(`<#${settings.ignoreChannel.join('>, <#')}>`);
                interaction.reply({ embeds: [embed] });
                break;
        }
    }
}
exports.default = default_1;
