"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CommandClass_1 = __importDefault(require("./CommandClass"));
class default_1 extends CommandClass_1.default {
    constructor(spiritus) {
        super(spiritus, {
            name: 'N',
            aliases: [],
            args: [
                {
                    name: 'A',
                    description: 'D',
                    type: 'STRING',
                    required: true
                },
            ],
            description: 'D',
            category: 'C',
            cooldown: 5,
            userPermissions: [],
            botPermissions: [],
            subCommands: [],
        });
    }
    async execute(interaction, args, settings) {
        console.log(interaction);
        console.log(args);
        console.log(settings);
        console.log(discord_js_1.MessageEmbed);
    }
}
exports.default = default_1;
