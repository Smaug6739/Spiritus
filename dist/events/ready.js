"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
    constructor(spiritus) {
        this.spiritus = spiritus;
    }
    run() {
        var _a;
        const allData = [];
        for (const [_, command] of this.spiritus.commands) {
            if (command.category.toLowerCase() === 'admin')
                return;
            if (command.subCommands.length) {
                const subCommands = [];
                for (const subc of command.subCommands) {
                    const optionsOfSub = [];
                    if (subc.args && subc.args.length) {
                        for (const s of subc.args) {
                            optionsOfSub.push({
                                name: s.name || 'default_name',
                                description: s.description || 'default description',
                                type: s.type || 'STRING',
                                required: s.required || false
                            });
                        }
                    }
                    subCommands.push({
                        name: subc.name,
                        description: subc.description,
                        type: 1,
                        options: optionsOfSub
                    });
                }
                allData.push({
                    name: command.name,
                    type: 'SUB_COMMAND_GROUP',
                    description: command.description,
                    options: subCommands
                });
            }
            else {
                const options = [];
                if (command.args && command.args.length) {
                    command.args.map((arg) => {
                        options.push({
                            name: arg.name || 'default_name',
                            description: arg.description || 'default description',
                            type: arg.type || 'STRING',
                            required: arg.required || false
                        });
                    });
                }
                allData.push({
                    name: command.name,
                    description: command.description,
                    options: options
                });
            }
        }
        this.spiritus.client.guilds.cache.get('809702809196560405').commands.set(allData);
        console.log(`Logged in as ${(_a = this.spiritus.client.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
    }
}
exports.default = default_1;