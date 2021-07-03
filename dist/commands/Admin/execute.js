"use strict";
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
    async execute(interaction, args) {
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
        await interaction.reply(`${this.emojis.loading} Executing \`${command}\`...`);
        let stdOut = await doExec(command).catch(data => outputErr(interaction, data));
        return interaction.editReply(`\`\`\`bash\n${stdOut.toString()}\n\`\`\``);
    }
}
exports.default = default_1;
