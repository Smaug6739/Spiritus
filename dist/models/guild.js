"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../config"));
const defaults = config_1.default.defaultSettings;
const guildSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    guildID: String,
    prefix: {
        "type": String,
        "default": defaults.prefix
    },
    logChannel: {
        "type": String,
        "default": defaults.logChannel
    },
    welcomeMessage: {
        "type": String,
        "default": defaults.welcomeMessage
    },
    expsysteme: {
        "type": Boolean,
        "default": false
    },
    serveurstats: {
        "type": Boolean,
        "default": false
    },
    invitations: {
        "type": Boolean,
        "default": defaults.invitations
    },
    rankcard: {
        "type": String,
        "default": defaults.rankcard
    },
    salonranks: {
        "type": String,
        "default": ""
    },
    modLogs: {
        "type": String,
        "default": ""
    },
    premium: {
        "type": Boolean,
        "default": false
    },
    reactionroles: {
        "type": Array,
        "default": []
    },
    modRoles: {
        "type": Array,
        "default": []
    },
    filter: {
        "type": Array,
        "default": []
    },
    ignoreChannel: {
        "type": Array,
        "default": []
    },
    links: {
        "type": Array,
        "default": []
    },
    commandes: {
        "type": Array,
        "default": []
    },
    shop: {
        "type": Array,
        "default": []
    },
    kickauto: {
        "type": Boolean,
        "default": defaults.kickauto
    },
});
exports.default = mongoose_1.model("Guild", guildSchema);
