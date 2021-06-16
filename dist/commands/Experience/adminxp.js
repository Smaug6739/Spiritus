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
            name: 'adminxp',
            aliases: [],
            args: [],
            description: 'Manage experience of users.',
            category: 'Experience',
            cooldown: 5,
            userPermissions: [],
            botPermissions: [],
            subCommands: [
                {
                    name: 'add',
                    description: 'Add exp to a user.',
                    args: [
                        {
                            name: 'user',
                            description: 'User to add experience',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'experience',
                            description: 'Number of experience points to add',
                            type: 'STRING',
                            required: true
                        },
                    ],
                },
                {
                    name: 'rem',
                    description: 'Remove exp to a user.',
                    args: [
                        {
                            name: 'user',
                            description: 'User to add experience',
                            type: 'STRING',
                            required: true
                        },
                        {
                            name: 'experience',
                            description: 'Number of experience points to remove',
                            type: 'STRING',
                            required: true
                        },
                    ],
                },
            ],
        });
    }
    execute(interaction, args, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!settings.expsysteme)
                return interaction.replyErrorMessage(`The experience system is not activated on this server. To activate it use the command \`/config experience\`.`);
            const user = yield this.spiritus.util.resolveMember(interaction.guild, args.get('user').value);
            const expChange = parseInt(args.get('experience').value);
            if (!user)
                return interaction.replyErrorMessage(`User not found.`);
            if (isNaN(expChange))
                return interaction.replyErrorMessage('Please enter a valid number.');
            const dbUser = yield this.spiritus.db.getUser(interaction.guild.id, user.id);
            switch (interaction.subcommand) {
                case 'add':
                    dbUser.experience -= expChange;
                    dbUser.save();
                    interaction.replySuccessMessage(`User experience is now \`${dbUser.experience += expChange}\`.`);
                    break;
                case 'rem':
                    dbUser.experience -= expChange;
                    dbUser.save();
                    interaction.replySuccessMessage(`User experience is now \`${dbUser.experience -= expChange}\`.`);
                    break;
            }
        });
    }
}
exports.default = Ping;
