"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
    constructor(spiritus) {
        this.spiritus = spiritus;
    }
    run() {
        const allData = [];
        const categories = [];
        for (const [_, command] of this.spiritus.commands) {
            if (command.category.toLowerCase() === 'admin')
                continue;
            if (!categories.includes(command.category))
                categories.push(command.category);
            let options = [];
            if (command.subCommands) {
                command.subCommands.forEach((sub) => {
                    options.push({
                        type: 'SUB_COMMAND',
                        name: sub.name,
                        description: sub.description,
                        required: sub.required,
                        choices: sub.choices,
                        options: sub.options,
                    });
                });
            }
            if (command.options) {
                command.options.forEach((op) => {
                    options.push({
                        type: 'STRING',
                        name: op.name,
                        description: op.description,
                        required: op.required,
                        choices: op.choices,
                        options: op.options,
                    });
                });
            }
            allData.push({
                name: command.name,
                description: command.description,
                options: options,
                defaultPermission: command.defaultPermission,
            });
        }
        // Dev
        //this.spiritus.client.guilds.cache.get('809702809196560405')!.commands.set(allData);
        // Prod
        this.spiritus.client.application.commands.set(allData);
        console.log(`Logged in as ${this.spiritus.client.user?.tag}!`);
    }
}
exports.default = default_1;
/*
if (command.subCommands.length) {
                const subCommands = []
                for (const subc of command.subCommands) {
                    const optionsOfSub = [];
                    if (subc.args && subc.args.length) {
                        for (const s of subc.args) {
                            optionsOfSub.push({
                                name: s.name || 'default_name',
                                description: s.description || 'default description',
                                type: s.type || 'STRING',
                                required: s.required || false
                            })
                        }
                    }
                    subCommands.push({
                        name: subc.name,
                        description: subc.description,
                        type: 1,
                        options: optionsOfSub
                    })
                }
                allData.push({
                    name: command.name,
                    type: 'SUB_COMMAND_GROUP',
                    description: command.description,
                    options: subCommands
                })
            }
            */ 
