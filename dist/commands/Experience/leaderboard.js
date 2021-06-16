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
            name: 'leaderboard',
            aliases: [],
            args: [],
            description: 'View leaderboard of server.',
            category: 'Experience',
            cooldown: 5,
            userPermissions: [],
            botPermissions: [],
            subCommands: [],
        });
    }
    execute(interaction, _, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!settings.expsysteme)
                return interaction.replyErrorMessage(`The experience system is not activated on this server. To activate it use the command \`/config experience\`.`);
            const embed = new discord_js_1.MessageEmbed();
            if (interaction.guild.iconURL())
                embed.setThumbnail(`${interaction.guild.iconURL()}`);
            embed.setTitle('TOP 10 ranking of guild users');
            embed.setColor(this.spiritus.colors.embed);
            embed.setTimestamp();
            embed.setFooter('Command module: Experience');
            yield this.spiritus.db.getUsers(interaction.guild.id).then((p) => {
                p.sort((a, b) => (a.experience < b.experience) ? 1 : -1).splice(0, 10).forEach((e) => {
                    embed.addField(e.username, `${e.experience} experience points, level : ${e.level}`);
                });
            });
            interaction.reply({ embeds: [embed] });
        });
    }
}
exports.default = default_1;
