"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = __importDefault(require("../CommandClass"));
class default_1 extends CommandClass_1.default {
    constructor(spiritus) {
        super(spiritus, {
            name: 'support',
            aliases: [],
            args: [],
            description: 'Get link of support server.',
            category: 'Other',
            cooldown: 5,
            userPermissions: [],
            botPermissions: [],
            subCommands: [],
        });
    }
    async execute(interaction) {
        interaction.reply(`Support server is : https://discord.gg/TC7Qjfs`);
    }
}
exports.default = default_1;
