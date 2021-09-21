"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
    constructor(spiritus) {
        this.spiritus = spiritus;
    }
    async run(member) {
        const guildDb = await this.spiritus.db.getGuild(member.guild.id);
        if (!guildDb || !guildDb.welcomeMessage || !guildDb.welcomeChannel)
            return;
        const channel = await this.spiritus.util.resolveChannel(member.guild, guildDb.welcomeChannel);
        if (!channel)
            return;
        if (!(channel).permissionsFor(member.guild.me).has('SEND_MESSAGES'))
            return;
        const msg = guildDb.welcomeMessage
            .replaceAll('{Guild}', member.guild.name)
            .replaceAll('{User}', member.user.username);
        channel.send({
            content: msg
        });
    }
}
exports.default = default_1;
