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
            name: 'rename',
            aliases: [],
            args: [
                {
                    name: 'user',
                    description: 'User to change',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'new_name',
                    description: 'New username',
                    type: 'STRING',
                    required: true
                },
            ],
            description: 'Rename user from the guild',
            category: 'Moderation',
            cooldown: 5,
            userPermissions: ['MODERATOR'],
            botPermissions: ['MANAGE_MEMBERS'],
            subCommands: [],
        });
    }
    execute(interaction, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const argMember = args.get('user').value;
            const argNewName = args.get('new_name').value;
            const member = yield this.spiritus.util.resolveMember(interaction.guild, argMember);
            if (member == undefined)
                return interaction.replyErrorMessage(`User not found.`);
            if (argNewName.length > 15)
                return interaction.replyErrorMessage(`The nickname is too long.`);
            if (argNewName.length < 2)
                return interaction.replyErrorMessage(`The nickname is too short.`);
            let e = 0;
            yield member.setNickname(argNewName)
                .catch(() => {
                e = 1;
                interaction.replyErrorMessage(`An error has occurred. Please try again.`);
            });
            if (!e)
                interaction.replySuccessMessage(`I have updated the nickname of the user ${member}.`);
        });
    }
}
exports.default = default_1;
