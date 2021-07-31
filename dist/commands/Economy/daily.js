"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = __importDefault(require("../CommandClass"));
class default_1 extends CommandClass_1.default {
    constructor(spiritus) {
        super(spiritus, {
            name: 'daily',
            aliases: [],
            options: [],
            description: 'Give your money every day.',
            category: 'Economy',
            cooldown: 5,
            userPermissions: [],
            botPermissions: [],
            subCommands: [],
        });
    }
    async execute(interaction) {
        const dbUser = await this.db.getUser(interaction.user, interaction.guild.id);
        const dailyCD = 8.64e+7;
        if (!dbUser) {
            await this.db.createUser({
                guildID: interaction.guild.id,
                guildName: interaction.guild.name,
                userID: interaction.user.id,
                username: interaction.user.tag,
                coins: 500,
                daily: Date.now(),
            });
            interaction.replySuccessMessage(`You just received 500 coins <@${interaction.user.id}> !`);
        }
        else {
            if (!dbUser.coins)
                this.db.updateUser(interaction.member, { coins: 0 });
            const lastDaly = await dbUser.daily;
            if (lastDaly != null && dailyCD - (Date.now() - lastDaly) > 0) {
                const cdTime = dailyCD - (Date.now() - lastDaly);
                interaction.replyErrorMessage(`You can't use this command before **${Math.floor(cdTime / (1000 * 60 * 60) % 24)}h** and **${Math.floor(cdTime / (1000 * 60) % 60)}min** ${interaction.user} !`);
            }
            else {
                this.db.updateUser(interaction.member, { coins: (dbUser.coins + 500), daily: Date.now() });
                interaction.replySuccessMessage(`You just received 500 coins ${interaction.user} !`);
            }
        }
    }
}
exports.default = default_1;
