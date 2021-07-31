"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMod = void 0;
async function checkMod(member, settings) {
    let isMod = false;
    if (settings.modRoles) {
        settings.modRoles.forEach((modRole) => {
            if (member.roles.cache.map((r) => r.id).includes(modRole))
                isMod = true;
        });
    }
    if (member.permissions.has('ADMINISTRATOR') || member.permissions.has('MANAGE_GUILD') || (settings.modRoles && settings.modRoles.length > 0 && isMod))
        return true;
    return false;
}
exports.checkMod = checkMod;
