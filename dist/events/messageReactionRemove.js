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
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
    constructor(spiritus) {
        this.spiritus = spiritus;
    }
    run(messageReaction, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = messageReaction.message;
            const member = message.guild.members.cache.get(user.id);
            const emoji = messageReaction.emoji.name;
            const emojiID = messageReaction.emoji.id;
            if (!member)
                return;
            if (!member.user)
                return;
            if (member.user.bot)
                return;
            const settings = yield this.spiritus.db.getGuild(message.guild.id);
            settings.reactionroles.forEach((element) => {
                if (element.messageID === `${message.id}` && element.channelID === `${message.channel.id}`) {
                    if (element.emoji == `${emojiID}` || element.emoji == `${emoji}`) {
                        const roleToAdd = message.guild.roles.cache.get(`${element.roleID}`);
                        if (!roleToAdd)
                            return;
                        if (message.guild.me.roles.highest.comparePositionTo(roleToAdd) <= 0)
                            return;
                        member.roles.remove(roleToAdd);
                    }
                }
            });
        });
    }
}
exports.default = default_1;
