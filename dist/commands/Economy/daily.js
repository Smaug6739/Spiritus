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
class default_1 extends CommandClass_1.default {
    constructor(spiritus) {
        super(spiritus, {
            name: 'daily',
            aliases: [],
            args: [],
            description: 'Give your money every day.',
            category: 'Economy',
            cooldown: 5,
            userPermissions: [],
            botPermissions: [],
            subCommands: [],
        });
    }
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbUser = yield this.db.getUser(interaction.user, interaction.guild.id);
            const dailyCD = 8.64e+7;
            if (!dbUser) {
                yield this.db.createUser({
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
                const lastDaly = yield dbUser.daily;
                if (lastDaly != null && dailyCD - (Date.now() - lastDaly) > 0) {
                    const cdTime = dailyCD - (Date.now() - lastDaly);
                    interaction.replyErrorMessage(`You can't use this command before **${Math.floor(cdTime / (1000 * 60 * 60) % 24)}h** and **${Math.floor(cdTime / (1000 * 60) % 60)}min** ${interaction.user} !`);
                }
                else {
                    this.db.updateUser(interaction.member, { coins: (dbUser.coins + 500), daily: Date.now() });
                    interaction.replySuccessMessage(`You just received 500 coins ${interaction.user} !`);
                }
            }
        });
    }
}
exports.default = default_1;
