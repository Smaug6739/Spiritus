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
            name: 'reaction-role',
            aliases: [],
            args: [],
            description: 'Manage roles from the server.',
            category: 'Administration',
            cooldown: 5,
            userPermissions: ['MANAGE_ROLES', 'MANAGE_MEMBERS'],
            botPermissions: ['MANAGE_ROLES'],
            subCommands: [
                {
                    name: 'add',
                    description: 'Add role-reaction in the guild.',
                    args: [
                        {
                            name: 'channel',
                            description: 'Channel to add message reaction.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'message',
                            description: 'ID of message to react.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'emoji',
                            description: 'The emoji.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'role',
                            description: 'The role.',
                            type: 'STRING',
                            required: true
                        }
                    ],
                },
                {
                    name: 'rem',
                    description: 'Remove role-reaction in the guild.',
                    args: [
                        {
                            name: 'channel',
                            description: 'Channel to remove message reaction.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'message',
                            description: 'ID of message remove react.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'emoji',
                            description: 'The emoji.',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'role',
                            description: 'The role.',
                            type: 'STRING',
                            required: true
                        }
                    ],
                },
                {
                    name: 'rem-all',
                    description: 'Remove all role-reaction of the guild.',
                    args: [],
                }
            ],
        });
    }
    execute(interaction, args, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (interaction.subcommand) {
                case 'add':
                    if (settings.reactionroles) {
                        try {
                            const channelRRAdd = this.util.resolveChannel(interaction.guild, args.get('channel').value);
                            if (!channelRRAdd)
                                return interaction.replyErrorMessage(`Channel not found.`);
                            const messageRRAdd = yield channelRRAdd.messages.fetch(args.get('message').value);
                            if (!messageRRAdd)
                                return interaction.replyErrorMessage(`interaction not found`);
                            let emoteRRAdd = yield this.util.resolveGuildEmoji(interaction.guild, args.get('emoji').value);
                            if (!emoteRRAdd && this.util.isUnicode(args.get('emoji').value))
                                emoteRRAdd = args.get('emoji').value;
                            if (!emoteRRAdd)
                                return interaction.replyErrorMessage(`Emoji not found.`);
                            const role = this.util.resolveRole(interaction.guild, args.get('role').value);
                            if (!role || role.id == interaction.guildID)
                                return interaction.replyErrorMessage(`Role not found.`);
                            let existingReactionRole = yield settings.reactionroles.find(r => r.emoji == emoteRRAdd.id ? emoteRRAdd.id : emoteRRAdd && r.interactionID == messageRRAdd.id && r.roleID == role.id);
                            if (existingReactionRole)
                                return interaction.replyErrorMessage(`Emoji already use for this interaction.`);
                            yield messageRRAdd.react(emoteRRAdd.id ? `${emoteRRAdd.name}:${emoteRRAdd.id}` : emoteRRAdd);
                            let arrayRRAdd = settings.reactionroles;
                            arrayRRAdd.push({ channelID: channelRRAdd.id, interactionID: messageRRAdd.id, emoji: emoteRRAdd.id ? emoteRRAdd.id : emoteRRAdd, roleID: role.id });
                            yield this.db.updateGuild(interaction.guild, { reactionroles: arrayRRAdd });
                            interaction.replySuccessMessage(`Role-reaction have been created.`);
                        }
                        catch (e) {
                            if (e.message.match('Unknown interaction'))
                                return interaction.replyErrorMessage(`interaction not found`);
                            else
                                return interaction.replyErrorMessage(`An error occurred. Please try again.`);
                        }
                    }
                    else
                        return interaction.replyErrorMessage(`An error occurred. Please try again.`);
                    break;
                case 'rem':
                    try {
                        const channel = this.util.resolveChannel(interaction.guild, args.get('channel').value);
                        if (!channel)
                            return interaction.replyErrorMessage(`Channel not found.`);
                        const messageRR = yield (yield this.util.resolveChannel(interaction.guild, args.get('channel').value)).messages.fetch(args.get('message').value);
                        if (!messageRR)
                            return interaction.replyErrorMessage(`interaction not found`);
                        if (!settings.reactionroles.find(r => r.interactionID === messageRR.id))
                            return interaction.replyErrorMessage(`There is no role-reaction under this interaction.`);
                        let emojiToRemove = yield this.util.resolveGuildEmoji(interaction.guild, args.get('emoji').value);
                        if (!emojiToRemove && this.util.isUnicode(args.get('emoji').value))
                            emojiToRemove = args.get('emoji').value;
                        if (!emojiToRemove)
                            return interaction.replyErrorMessage(`Emoji not found.`);
                        const role = this.util.resolveRole(interaction.guild, args.get('role').value);
                        if (!role || role.id == interaction.guildID)
                            return interaction.replyErrorMessage(` Impossible de trouver ce rôle.`);
                        this.db.updateGuild(interaction.guild, { $pull: { reactionroles: { channelID: channel, interactionID: messageRR.id, emoji: emojiToRemove, roleID: role.id } } });
                        interaction.replySuccessMessage(`I have deleted this role-reaction.`);
                    }
                    catch (e) {
                        if (e.interaction.match('Unknown interaction'))
                            return interaction.replyErrorMessage(`interaction not found`);
                        else
                            return interaction.replyErrorMessage(`An error occurred. Please try again.`);
                    }
                    break;
                case 'rem all':
                    yield this.db.updateGuild(interaction.guildID, { reactionroles: [] });
                    interaction.replySuccessMessage(`All guild roles-reactions have been deleted`);
                    break;
            }
        });
    }
}
exports.default = default_1;
