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
const child_process_1 = require("child_process");
class default_1 extends CommandClass_1.default {
    constructor(spiritus) {
        super(spiritus, {
            name: 'execute',
            aliases: [],
            args: [
                {
                    name: 'command',
                    description: 'command.',
                    type: 'STRING',
                    required: true
                },
            ],
            description: 'Execute a command.',
            category: 'Admin',
            cooldown: 5,
            userPermissions: ['BOT_ADMIN'],
            botPermissions: [],
            subCommands: [],
        });
    }
    execute(interaction, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const outputErr = (msg, stdData) => {
                const { stdout, stderr } = stdData;
                const message = stdout.concat(`\`\`\`${stderr}\`\`\``);
                msg.editReply(message);
            };
            const doExec = (cmd, opts = {}) => {
                return new Promise((resolve, reject) => {
                    child_process_1.exec(cmd, opts, (err, stdout, stderr) => {
                        if (err)
                            return reject({ stdout, stderr });
                        resolve(stdout);
                    });
                });
            };
            const command = args.get('command').value;
            yield interaction.reply(`${this.emojis.loading} Executing \`${command}\`...`);
            let stdOut = yield doExec(command).catch(data => outputErr(interaction, data));
            return interaction.editReply(`\`\`\`bash\n${stdOut.toString()}\n\`\`\``);
        });
    }
}
exports.default = default_1;
