"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(spiritus, options) {
        this.spiritus = spiritus;
        this.emojis = this.spiritus.emojis;
        this.util = this.spiritus.util;
        this.name = options.name;
        this.aliases = options.aliases;
        this.args = options.args;
        this.category = options.category;
        this.description = options.description;
        this.cooldown = options.cooldown;
        this.userPermissions = options.userPermissions;
        this.botPermissions = options.botPermissions;
        this.subCommands = options.subCommands;
    }
}
exports.default = Command;
