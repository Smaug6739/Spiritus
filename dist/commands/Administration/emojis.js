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
const axios_1 = __importDefault(require("axios"));
const CommandClass_1 = __importDefault(require("../CommandClass"));
class default_1 extends CommandClass_1.default {
    constructor(spiritus) {
        super(spiritus, {
            name: 'emojis',
            aliases: [],
            args: [],
            description: 'Manage roles from the server.',
            category: 'Administration',
            cooldown: 5,
            userPermissions: ['MANAGE_EMOJIS'],
            botPermissions: ['MANAGE_EMOJIS'],
            subCommands: [
                {
                    name: 'list',
                    description: 'List of moderators roles on the guild.',
                    usage: '',
                    args: [
                        {
                            name: 'emoji',
                            description: 'Emoji to create (url, server emoji...).',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'name',
                            description: 'Name of emoji.',
                            type: 'STRING',
                            required: true
                        }
                    ],
                    exemples: []
                },
                {
                    name: 'create',
                    description: 'Create an emoji on the guild.',
                    args: [
                        {
                            name: 'emoji',
                            description: 'Emoji to view.',
                            type: 'STRING',
                            required: true
                        }
                    ],
                },
                {
                    name: 'update',
                    description: 'Update emoji on the guild.',
                    args: [
                        {
                            name: 'emoji',
                            description: 'Emoji to update.',
                            type: 'STRING',
                            required: true
                        }
                    ],
                },
                {
                    name: 'delete',
                    description: 'Delete emoji on the guild.',
                    args: [
                        {
                            name: 'emoji',
                            description: 'Emoji to delete.',
                            type: 'STRING',
                            required: true
                        }
                    ],
                },
                {
                    name: 'view',
                    description: 'View an emoji.',
                    args: [
                        {
                            name: 'emoji',
                            description: 'Emoji to view.',
                            type: 'STRING',
                            required: true
                        }
                    ],
                },
            ],
        });
    }
    execute(interaction, args) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (interaction.subcommand) {
                case 'list':
                    const emojisListe = interaction.guild.emojis.cache.map(emojis => emojis.toString());
                    let embed = {
                        title: `List of emojis for the guild **${interaction.guild.name}** | ${emojisListe.length} in total`,
                        thumbnail: {
                            url: `${interaction.guild.iconURL()}`,
                        },
                        color: `${this.colors.embed}`,
                        description: '',
                        fields: []
                    };
                    if (emojisListe.join(' ').length > 2048) {
                        let i = '';
                        emojisListe.forEach(emoji => {
                            if (i.length <= 1024 && i.length + emoji.length > 1024)
                                embed.fields.push({ name: '\u200b', value: i, inline: true });
                            i = i.concat(' ', emoji);
                        });
                    }
                    else
                        embed.description = emojisListe.join(' ');
                    interaction.channel.send({ embeds: [embed] });
                    break;
                case 'create':
                    if ((/\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/).test(args.get('emoji').value))
                        return interaction.replyErrorMessage(`Vous ne pouvez pas crée un emojis présent sur discord`);
                    let base64Image;
                    if (args.get('emoji').value && (/<a?:([a-z0-9-_]+):(\d+)>/gi).test(args.get('emoji').value)) {
                        let extension = args.get('emoji').startsWith('<a:') ? '.gif' : '.png';
                        let emoteLink = `https://cdn.discordapp.com/emojis/${args.get('emoji').value.replace('<:', '').replace('<a:', '').replace('>', '').split(':')[1]}${extension}`;
                        const query = yield axios_1.default({
                            url: emoteLink,
                            responseType: 'arraybuffer'
                        })
                            .catch(() => { return; });
                        let data = Buffer.from(query.data, 'binary');
                        base64Image = `data:image/${extension.slice(1)};base64,` + data.toString('base64');
                    }
                    if (args.get('emoji').value && (args.get('emoji').value.startsWith('https://') || args.get('emoji').value.startsWith('http://')))
                        base64Image = args.get('emoji').value;
                    const name = args.get('name').value;
                    if (name.includes(':'))
                        return interaction.replyErrorMessage(`Name of emoji \`${name}\` is invalid.`);
                    let emote;
                    try {
                        emote = yield interaction.guild.emojis.create(base64Image, name);
                    }
                    catch (err) {
                        if (err.interaction.match('String value did not match validation regex'))
                            return interaction.replyErrorMessage(`The name is not valid.`);
                        else
                            return interaction.replyErrorMessage(`An error has occurred. Please try again.`);
                    }
                    const embedCreate = new discord_js_1.MessageEmbed()
                        .setTitle(`${this.emojis.success} Emoji created`)
                        .setColor(this.colors.green)
                        .setThumbnail(`https://cdn.discordapp.com/emojis/${emote.id}${emote.animated ? '.gif' : '.png'}`)
                        .addField(`Name :`, `${emote.name}`, true)
                        .addField(`Emoji :`, `<${emote.animated ? 'a' : ''}:${emote.name}:${emote.id}>`, true)
                        .setTimestamp()
                        .setFooter('Command module: Administration');
                    interaction.reply({ embeds: [embedCreate] });
                    break;
                case 'update':
                    const emoji = yield this.util.resolveGuildEmoji(interaction.guild, args.get('emoji').value);
                    if (!emoji)
                        return interaction.replyErrorMessage(`Emoji not found.`);
                    else {
                        emoji.edit({
                            name: `${args.get('emoji').value.toLowerCase()}`
                        });
                        const embedUpdate = new discord_js_1.MessageEmbed()
                            .setTitle(`Emoji update`)
                            .setColor(`${this.colors.green}`)
                            .setThumbnail(`https://cdn.discordapp.com/emojis/${emoji.id}${emoji.animated ? '.gif' : '.png'}`)
                            .addField(`Action :`, `Update`, true)
                            .addField(`Name :`, `${emoji.name}`, true)
                            .setTimestamp()
                            .setFooter(`Command module: Administration`);
                        interaction.reply({ embeds: [embedUpdate] });
                    }
                    break;
                case 'delete':
                    const emojiToDelete = yield this.util.resolveGuildEmoji(interaction.guild, args.get('emoji').value);
                    if (!emojiToDelete)
                        return interaction.replyErrorMessage(`Emoji not found.`);
                    else {
                        emojiToDelete.delete();
                        const embedDelete = new discord_js_1.MessageEmbed()
                            .setTitle('Emoji delete')
                            .setColor(this.colors.green)
                            .setThumbnail(`https://cdn.discordapp.com/emojis/${emojiToDelete.id}${emojiToDelete.animated ? '.gif' : '.png'}`)
                            .addField(`Action :`, `Delete`, true)
                            .addField(`Name :`, `${emojiToDelete.name}`, true)
                            .setTimestamp()
                            .setFooter(`Command module: Administration`);
                        interaction.reply({ embeds: [embedDelete] });
                    }
                    break;
                case 'view':
                    const emoteID = yield args.get('emoji').value.trim().replace('<:', '').replace('<a:', '').replace('>', '').split(':')[1];
                    if (!emoteID)
                        return interaction.replyErrorMessage(`Emoji not found.`);
                    const emoteURL = `https://cdn.discordapp.com/emojis/${emoteID}${args.get('emoji').value.startsWith('<a:') ? '.gif' : '.png'}`;
                    const embedView = new discord_js_1.MessageEmbed()
                        .setTitle('Emoji view')
                        .setColor(this.colors.embed)
                        .setImage(emoteURL)
                        .setTimestamp()
                        .setFooter('Command module: Administration');
                    interaction.reply({ embeds: [embedView] });
                    break;
            }
        });
    }
}
exports.default = default_1;
