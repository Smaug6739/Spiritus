"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = __importDefault(require("../CommandClass"));
const util_1 = __importDefault(require("util"));
class default_1 extends CommandClass_1.default {
    constructor(spiritus) {
        super(spiritus, {
            name: 'eval',
            aliases: [],
            args: [
                {
                    name: 'eval',
                    description: 'the evaled code.',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'options',
                    description: 'command.',
                    type: 'STRING',
                    required: false
                },
            ],
            description: 'Eval js code.',
            category: 'Admin',
            cooldown: 5,
            userPermissions: ['BOT_ADMIN'],
            botPermissions: [],
            subCommands: [],
        });
    }
    async execute(interaction, args) {
        let evaled = args.get('eval').value;
        try {
            if (args.get('options')?.value === 'a' || args.get('options')?.value === 'async') {
                evaled = `(async () => { ${args.get('eval').value.trim()} })()`;
            }
            evaled = await eval(evaled);
            console.log(evaled);
            if (typeof evaled === 'object') {
                evaled = util_1.default.inspect(evaled, { depth: 0, showHidden: true });
            }
            else {
                evaled = String(evaled);
            }
        }
        catch (err) {
            return interaction.reply(`\`\`\`js\n${err.stack}\`\`\``);
        }
        const token = this.spiritus.token;
        const regex = new RegExp(token + "g");
        evaled = evaled.replace(regex, 'no.');
        const fullLen = evaled.length;
        if (fullLen === 0) {
            return null;
        }
        if (fullLen > 2000) {
            evaled = evaled.match(/[\s\S]{1,1900}[\n\r]/g) || [];
            if (evaled.length > 3) {
                interaction.channel.send(`\`\`\`js\n${evaled[0]}\`\`\``);
                interaction.channel.send(`\`\`\`js\n${evaled[1]}\`\`\``);
                interaction.channel.send(`\`\`\`js\n${evaled[2]}\`\`\``);
                return;
            }
            return evaled.forEach((message) => {
                interaction.reply(`\`\`\`js\n${message}\`\`\``);
                return;
            });
        }
        return interaction.reply(`\`\`\`js\n${evaled}\`\`\``);
    }
}
exports.default = default_1;
