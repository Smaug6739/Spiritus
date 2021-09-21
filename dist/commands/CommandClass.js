"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(spiritus, options) {
        this.spiritus = spiritus;
        this.emojis = this.spiritus.emojis;
        this.colors = this.spiritus.colors;
        this.util = this.spiritus.util;
        this.db = this.spiritus.db;
        this.name = options.name;
        this.aliases = options.aliases;
        this.options = options.options;
        this.category = options.category;
        this.description = options.description;
        this.cooldown = options.cooldown;
        this.userPermissions = options.userPermissions;
        this.botPermissions = options.botPermissions;
        this.subCommands = options.subCommands;
    }
}
exports.default = Command;
