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
            name: 'unlock',
            aliases: [],
            args: [
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
    execute(interaction, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const argChannel = args.get('channel').value;
            let channel = this.spiritus.util.resolveChannel(interaction.guild, argChannel);
            if (channel == undefined)
                return interaction.replyErrorMessage(`Channel not found.`);
            yield channel.updateOverwrite(interaction.guild.roles.everyone, {
                SEND_MESSAGES: true
            })
                .catch(() => interaction.replyErrorMessage('An error occurred. Please try again'));
            interaction.replySuccessMessage(`I have unlock the channel ${channel}`);
        });
    }
}
exports.default = default_1;
