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
            name: 'shop',
            aliases: [],
            options: [
                {
                    name: 'buy',
                    description: 'Buy an object in shop',
                    type: 'STRING',
                    required: false
                },
            ],
            description: 'View shop and buy items.',
            category: 'Economy',
            cooldown: 5,
            userPermissions: [],
            botPermissions: [],
            subCommands: [],
        });
    }
    async execute(interaction, args, settings) {
        if (!args.first()) {
            let haveItems = false;
            const embed = new discord_js_1.MessageEmbed();
            embed.setTitle(`Shop of the guild ${interaction.guild.name} :`);
            embed.setColor(this.spiritus.colors.embed);
            embed.setTimestamp();
            embed.setFooter(`Command module: Economy`);
            if (settings.shop) {
                settings.shop.slice(0, 20).forEach(objet => {
                    haveItems = true;
                    embed.addField(`${this.emojis.arrow} ${objet.name} __Price :__ ${objet.price} ${this.emojis.coins}`, `__Description :__ ${objet.description}`);
                });
                if (!haveItems)
                    embed.addField('\u200b', 'No items to buy at the moment.');
                embed.addField(`\u200b`, `You can buy object with the command \`${settings.prefix}shop buy <item_name>\``, false);
            }
            else {
                embed.addField(`No items in the shop.`, `\u200b`, true);
            }
            return interaction.reply({ embeds: [embed] });
        }
        if (args.get('buy')) {
            const dbUser = await this.util.getUser(interaction.user, interaction.guild.id);
            if (!dbUser)
                return interaction.replyErrorMessage(`You have 0${this.emojis.coins} so you can't buy object in shop.`);
            const objetName = args.get('buy').value;
            let existObj = settings.shop.find(e => e.name == objetName);
            if (!existObj)
                return interaction.replyErrorMessage(`Object not found.`);
            else {
                if (dbUser.coins < existObj.price)
                    return interaction.replyErrorMessage(`You don't have enough coins for this.`);
                const remCoins = dbUser.coins - existObj.price;
                const arr = dbUser.objets;
                arr.push({
                    name: objetName,
                    price: existObj.price,
                    description: existObj.description,
                });
                this.db.updateUser(interaction.member, { coins: remCoins, objets: arr });
                interaction.replySuccessMessage(`You just bought  \`${existObj.name}\`. This object is now in your inventory.`);
            }
        }
    }
}
exports.default = default_1;
