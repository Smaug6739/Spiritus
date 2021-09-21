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
            name: 'unban',
            aliases: [],
            options: [
                {
                    name: 'user',
                    description: 'User to change',
                    type: 'STRING',
                    required: true
                },
            ],
            description: 'Unban user from the guild',
            category: 'Moderation',
            cooldown: 5,
            userPermissions: ['MODERATOR'],
            botPermissions: ['MANAGE_MEMBERS'],
            subCommands: [],
        });
    }
    async execute(interaction, args) {
        try {
            const user = await this.spiritus.util.resolveUser(args.get('user').value);
            if (!user)
                return interaction.replyErrorMessage(`User not found.`);
            interaction.guild.members.unban(user);
            const embed = new discord_js_1.MessageEmbed()
                .setAuthor(`${user.username} (${user.id})`, user.displayAvatarURL())
                .setColor(this.spiritus.colors.red)
                .setDescription(`**Action**: unban`)
                .setTimestamp()
                .setFooter(interaction.user.username, interaction.user.displayAvatarURL());
            interaction.reply({ embeds: [embed] });
        }
        catch (e) {
            console.log(e);
            if (e.message.match("Unknown User"))
                return interaction.replyErrorMessage(`User not found.`);
            else
                return interaction.replyErrorMessage(`An error has occurred. Please try again.`);
        }
    }
}
exports.default = default_1;
