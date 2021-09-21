"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = __importDefault(require("../CommandClass"));
class default_1 extends CommandClass_1.default {
    constructor(spiritus) {
        super(spiritus, {
            name: 'unlock',
            aliases: [],
            options: [
                {
                    name: 'channel',
                    description: 'Channel to unlock',
                    type: 'STRING',
                    required: true
                },
            ],
            description: 'Unlock channel from the guild',
            category: 'Moderation',
            cooldown: 5,
            userPermissions: ['MODERATOR'],
            botPermissions: ['MANAGE_CHANNELS'],
            subCommands: [],
        });
    }
    async execute(interaction, args) {
        const argChannel = args.get('channel').value;
        let channel = this.spiritus.util.resolveChannel(interaction.guild, argChannel);
        if (channel == undefined)
            return interaction.replyErrorMessage(`Channel not found.`);
        await channel.updateOverwrite(interaction.guild.roles.everyone, {
            SEND_MESSAGES: true
        })
            .catch(() => interaction.replyErrorMessage('An error occurred. Please try again'));
        interaction.replySuccessMessage(`I have unlock the channel ${channel}`);
    }
}
exports.default = default_1;
