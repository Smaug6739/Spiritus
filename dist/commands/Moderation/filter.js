"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CommandClass_1 = __importDefault(require("../CommandClass"));
class default_1 extends CommandClass_1.default {
    constructor(spiritus) {
        super(spiritus, {
            name: 'filter',
            aliases: [],
            args: [
                {
                    name: 'A',
                    description: 'D',
                    type: 'STRING',
                    required: true
                },
            ],
            description: 'Add word to the blacklist',
            category: 'Moderation',
            cooldown: 5,
            userPermissions: ['MODERATOR'],
            botPermissions: [],
            subCommands: [
                {
                    name: 'add',
                    description: 'Add word to the blacklist',
                    args: [
                        {
                            name: 'word',
                            description: 'Word to add to the blacklist',
                            type: 'STRING',
                            required: true
                        },
                    ],
                },
                {
                    name: 'rem',
                    description: 'Remove word to the blacklist',
                    args: [
                        {
                            name: 'word',
                            description: 'Word to remove to the blacklist',
                            type: 'STRING',
                            required: true
                        },
                    ],
                },
                {
                    name: 'list',
                    description: 'View blacklist',
                    args: [],
                },
            ],
        });
    }
    async execute(interaction, args, settings) {
        switch (interaction.subcommand) {
            case 'add':
                const wordToAdd = args.get('word').value;
                settings.filter.push(wordToAdd);
                await this.spiritus.db.updateGuild(interaction.guildID, { $push: { filter: wordToAdd } });
                interaction.replySuccessMessage(`This word is now forbidden on the server.`);
                break;
            case 'rem':
                const wordToRemove = args.get('word').value;
                if (!settings.filter.includes(wordToRemove))
                    return interaction.replyErrorMessage(`This word is not in the list.`);
                await this.spiritus.db.updateGuild(interaction.guildID, { $pull: { filter: wordToRemove } });
                interaction.replySuccessMessage(`The word \`${wordToRemove}\` is now allowed.`);
                break;
            case 'list':
                if (!settings.filter || settings.filter.length < 1)
                    return interaction.replyErrorMessage(`There are no forbidden words for this server. To add it use the command \`${settings.prefix}filter add <mot>\``);
                const embed = new discord_js_1.MessageEmbed()
                    .setTitle(`List of words in blacklist of this guild**${interaction.guild.name}** | ${settings.filter.length} total`)
                    .setThumbnail(interaction.guild.iconURL() ? interaction.guild.iconURL() : '')
                    .setColor(this.spiritus.colors.embed)
                    .setDescription(`\`${settings.filter.join('\`, \`')}\``)
                    .setFooter('Command module: Moderation')
                    .setTimestamp();
                interaction.reply({ embeds: [embed] });
                break;
        }
    }
}
exports.default = default_1;
