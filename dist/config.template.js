"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    PREFIX: ";",
    owner: {
        id: "<user_id>",
        username: "User#tag" // Example : Smaug#6739
    },
    defaultSettings: {
        guildName: "no name",
        prefix: ";",
        logChannel: "bot-logs",
        welcomeMessage: "Welcome {{user}}",
        rankcard: "<image url>",
        invitations: false,
        kickauto: false
    },
    admins: ["user_id"],
    colors: {
        embed: '#3498db',
        red: '#ff0004',
        orange: 'ff8400',
        green: '#02ff30',
    },
    emojis: {
        ONLINE: '<:emoji_name:id>',
        IDLE: '<:emoji_name:id>',
        DND: '<:emoji_name:id>',
        OFFLINE: '<:emoji_name:id>',
        CHANNEL: '<:emoji_name:id>',
        CHANNELNSFW: '<:emoji_name:id>',
        VOICE: '<:emoji_name:id>',
        ETIQUETTE: '<:emoji_name:id>',
        BOOST: '<:emoji_name:id>',
        LOGOBOT: '<:emoji_name:id>',
        boost: '<:emoji_name:id>',
        info: '<:emoji_name:id>',
        voice: '<:emoji_name:id>',
        channel: '<:emoji_name:id>',
        success: '<:emoji_name:id>',
        error: '<:emoji_name:id>',
        loading: '<:emoji_name:id>',
        arrow: '<:emoji_name:id>',
        coins: '<:emoji_name:id>'
    },
    tokens: {
        discord: '<discord token>'
    },
    mongoose: {
        connection: 'mongodb://localhost:27017/spiritus'
    },
    logs: '<discord webhook url>'
};
