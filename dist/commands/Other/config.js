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
class Ping extends CommandClass_1.default {
    constructor(spiritus) {
        super(spiritus, {
            name: 'config',
            aliases: [],
            args: [],
            description: 'Get ping of the bot',
            category: 'Other',
            cooldown: 5,
            userPermissions: [],
            botPermissions: [],
            subCommands: [
                {
                    name: 'log-channel',
                    description: 'Change log-channel of the guild.',
                    args: [{
                            name: 'channel',
                            description: 'The channel for logs',
                            type: 'STRING',
                            required: true
                        }],
                },
                {
                    name: 'experience',
                    description: 'Change status of leveling system of the guild.',
                    args: [],
                },
                {
                    name: 'admin-invites',
                    description: 'Change status of anti invitations system of the guild.',
                    args: [],
                },
                {
                    name: 'rank-card',
                    description: 'Change rank-card.',
                    args: [{
                            name: 'url',
                            description: 'The image url',
                            type: 'STRING',
                            required: true
                        }],
                },
                {
                    name: 'rank-channel',
                    description: 'Change rank-channel setting.',
                    args: [{
                            name: 'channel',
                            description: 'The channel (tape \'disable\' to disable it).',
                            type: 'STRING',
                            required: true
                        }],
                },
            ],
        });
    }
    execute(interaction, args, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (interaction.subcommand) {
                case 'log-channel':
                    const logChannel = args.get('channel').value;
                    if (logChannel) {
                        yield this.spiritus.db.updateGuild(interaction.guild, { logChannel: logChannel });
                        return interaction.replySuccessMessage(`logChannel updated : \`${settings.logChannel}\` ->\`${logChannel}\``);
                    }
                    interaction.replySuccessMessage(`Current logs channel : \`${settings.logChannel}\``);
                    break;
                // case 'welcomeMessage':
                // 	if (newSetting) {
                // 		await this.spiritus.db.updateGuild(interaction.guild, { welcomeMessage: newSetting });
                // 		return interaction.replySuccessMessage(`welcomeMessage updated : \`${settings.welcomeMessage}\` ->\`${newSetting}\``)
                // 	}
                // 	interaction.replySuccessMessage(`Current welcome interaction : \`${settings.welcomeMessage}\``);
                // 	break;
                case 'experience':
                    let uexp;
                    if (settings.expsysteme == true)
                        uexp = false;
                    else
                        uexp = true;
                    yield this.spiritus.db.updateGuild(interaction.guild, { expsysteme: uexp });
                    interaction.replySuccessMessage(`Leveling system updated : \`${settings.expsysteme}\` ->\`${uexp}\``);
                    break;
                case 'admin-invites':
                    let invit;
                    if (settings.invitations == true)
                        invit = false;
                    else
                        invit = true;
                    yield this.spiritus.db.updateGuild(interaction.guild, { invitations: invit });
                    interaction.replySuccessMessage(`System anti-invitations of the guild updated : \`${settings.invitations}\` ->\`${invit}\``);
                    break;
                case 'rank-card':
                    const rankCard = args.get('url').value;
                    if (rankCard) {
                        if (rankCard.includes('png') || rankCard.includes('PNG') || rankCard.includes('JPG') || rankCard.includes('jpg') || rankCard.includes('JPEG') || rankCard.includes('jpeg') || rankCard.includes('GIF') || rankCard.includes('gif')) {
                            yield this.spiritus.db.updateGuild(interaction.guild, { rankcard: rankCard });
                            return interaction.replySuccessMessage(`Rank-card updated : \`${settings.rankcard}\` ->\`${rankCard}\``);
                        }
                        else
                            return interaction.replyErrorMessage(`The file is not in a valid format. Valid formats are : png, jpg, jpeg et gif`);
                    }
                    interaction.replySuccessMessage(`Current rank-card : \`${settings.rankcard}\``);
                    break;
                case 'rank-channel':
                    const rankChannel = args.get('channel').value;
                    if (rankChannel) {
                        if (rankChannel === 'disable') {
                            this.spiritus.db.updateGuild(interaction.guild, { salonranks: "" });
                            return interaction.replySuccessMessage(`Rank channel has been disable.`);
                        }
                        else {
                            const channel = this.spiritus.util.resolveChannel(interaction.guild, rankChannel);
                            if (!channel || channel == undefined)
                                return interaction.replyErrorMessage(`Channel not found.`);
                            else {
                                yield this.spiritus.db.updateGuild(interaction.guild, { salonranks: channel.id });
                                return interaction.replySuccessMessage(`Rank-channel updated : \`${rankChannel}\``);
                            }
                        }
                    }
                    interaction.replySuccessMessage(`Current rank-channel : \`${settings.salonranks || 'none'}\``);
                    break;
            }
        });
    }
}
exports.default = Ping;
