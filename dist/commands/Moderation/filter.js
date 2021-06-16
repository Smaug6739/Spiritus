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
            name: 'N',
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
    execute(interaction, args, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (interaction.subcommand) {
                case 'add':
                    const wordToAdd = args.get('word').value;
                    settings.filter.push(wordToAdd);
                    yield this.spiritus.db.updateGuild(interaction.guildID, { $push: { filter: wordToAdd } });
                    interaction.replySuccessMessage(`This word is now forbidden on the server.`);
                    break;
                case 'rem':
                    const wordToRemove = args.get('word').value;
                    if (!settings.filter.includes(wordToRemove))
                        return interaction.replyErrorMessage(`This word is not in the list.`);
                    yield this.spiritus.db.updateGuild(interaction.guildID, { $pull: { filter: wordToRemove } });
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
        });
    }
}
exports.default = default_1;
