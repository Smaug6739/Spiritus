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
            name: 'inventory',
            aliases: [],
            args: [
                {
                    name: 'user',
                    description: 'View invertory of user',
                    type: 'STRING',
                    required: false
                },
                {
                    name: 'rem',
                    description: 'Remove object of inventory',
                    type: 'STRING',
                    required: false
                }
            ],
            description: 'See your inventory.',
            category: 'Economy',
            cooldown: 5,
            userPermissions: [],
            botPermissions: [],
            subCommands: [],
        });
    }
    async execute(interaction, args) {
        if (args.get('rem')) {
            const dbUser = await this.db.getUser(interaction.user, interaction.guild.id);
            const title = args.get('rem').value;
            let objet = dbUser.objets.map((e) => e.name).includes(title);
            if (objet) {
                this.db.updateUser(interaction.member, { $pull: { objets: { name: title } } });
                interaction.replySuccessMessage(`I have deleted this item.`);
            }
            else
                return interaction.replyErrorMessage(`Item not found.`);
        }
        else {
            if (args.get('user')) {
                const user = this.util.resolveUser(args.get('user').value);
                const mentionUser = await this.db.getUser(user, interaction.guild.id);
                if (mentionUser == undefined)
                    return interaction.reply(`${user.user.username} have **0** ${this.emojis.coins} and don't have items.`);
                else {
                    const embed = new discord_js_1.MessageEmbed();
                    embed.setTitle(`Inventory of **${user.username}**`);
                    embed.setColor(this.colors.EMBEDCOLOR);
                    if (interaction.guild.iconURL())
                        embed.setThumbnail(`${interaction.guild.iconURL()}`);
                    embed.addField(`\u200b`, `**${user.tag}** have ${mentionUser.coins} ${this.emojis.coins} .`, false);
                    if (mentionUser.objets) {
                        embed.addField("Items possesses : ", `\u200b`, false);
                        mentionUser.objets.slice(0, 15).forEach((objet) => {
                            embed.addField(`\u200b`, `${this.emojis.fleche} ${objet.name}\n__Value :__ ${objet.price} ${this.emojis.coins}\n__Description :__ ${objet.description}`, false);
                        });
                        embed.addField(`\u200b`, `You can delete item with the command \`inventaire rem\``, false);
                    }
                    embed.setTimestamp();
                    embed.setFooter(`Inventory of ${user.tag} (${user.id})`);
                    interaction.reply({ embeds: [embed] });
                }
            }
            else {
                const dbUser = await this.db.getUser(interaction.user, interaction.guild.id);
                if (!dbUser) {
                    await this.db.createUser({
                        guildID: interaction.guildId,
                        guildName: interaction.guild.name,
                        userID: interaction.user.id,
                        username: interaction.user.tag,
                        coins: 0,
                        daily: Date.now(),
                    });
                    interaction.reply(`You have **0** ${this.emojis.coins} and you don't have items ${interaction.user}.`);
                }
                else {
                    if (!dbUser.coins)
                        this.db.updateUser(interaction.guildId, interaction.user.id, { coins: 0 });
                    const embed = new discord_js_1.MessageEmbed();
                    embed.setTitle(`Inventory of **${interaction.user.username}**`);
                    embed.setColor(this.colors.embed);
                    if (interaction.guild.iconURL())
                        embed.setThumbnail(`${interaction.guild.iconURL()}`);
                    embed.addField(`\u200b`, `**${interaction.user.tag}** has ${dbUser.coins} ${this.emojis.coins} .`, false);
                    if (dbUser.objets) {
                        embed.addField("Items possesses : ", `\u200b`, false);
                        dbUser.objets.slice(0, 15).forEach((objet) => {
                            embed.addField(`\u200b`, `${this.emojis.fleche} ${objet.name}\n__Value :__ ${objet.price} ${this.emojis.coins}\n__Description :__ ${objet.description}`, false);
                        });
                        embed.addField(`\u200b`, `You can delete items with the command \`inventory rem\``, false);
                    }
                    embed.setTimestamp();
                    embed.setFooter(`Inventory of ${interaction.user.tag} (${interaction.user.id})`);
                    interaction.reply({ embeds: [embed] });
                }
            }
        }
    }
}
exports.default = default_1;
