const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
const Command = require('../Command');

class Pull extends Command {
    constructor(delta) {
        super(delta);
        this.name = 'pull';
        this.module = 'Bot Admin';
        this.argsRequired = false;
        this.description = 'Pull from the remote repository';
    }

    async execute (msg) {
        const message = await msg.channel.createMessage(`${this.delta.emotes.loading} Updating...`);
        try {
            await exec('git pull');
            message.edit(`${this.delta.emotes.success} Updated.`);
        } catch (err) {
            message.edit(`${this.delta.emotes.error} An error occured:\n\`\`\`${err}\n\`\`\``);
        }
    }
}
module.exports = Pull;