module.exports = client => {

    client.console = message =>{
        console.log(message)
    }
    client.resolveMember = (guild, arg) => {
        if (!arg || !guild || guild.avalaible) {
            return;
        }
        let user = guild.members.cache.find(mem => mem.id === arg.replace('!', '').replace(/<@|>/g, '') || mem.user.username.toLowerCase().startsWith(arg.toLowerCase()) || mem.user.username.toLowerCase() === arg.toLowerCase() || `${mem.user.username.toLowerCase()}#${mem.user.discriminator}` === arg.toLowerCase() || (mem.nick && mem.nick.toLowerCase().startsWith(arg)) || (mem.nick && mem.nick.toLowerCase() === arg.toLowerCase()));
        return user;
    }
    client.resolveUser = (arg) => {
        if (!arg) {
            return;
        }
        const user = client.users.cache.find(uzer => uzer.id === arg.replace('!', '').replace(/<@|>/g, '') || uzer.username.toLowerCase().startsWith(arg.toLowerCase()) || uzer.username.toLowerCase() === arg.toLowerCase() || `${uzer.username.toLowerCase()}#${uzer.discriminator}` === arg.toLowerCase());
        return user;
    }
    client.resolveChannel = (guild, arg) => {
        if (!guild || !arg) {
            return;
        }
        let channel = guild.channels.cache.find(chan => chan.id === arg || chan.id === arg.replace(/<#|>/g, '') || chan.name === arg.toLowerCase());
        return channel;
    }
    client.resolveGuild = (arg) => {
        if (!arg) {
            return;
        }

        let guild = client.guilds.cache.find(g => g.id === arg || g.name === arg.toLowerCase());

        return guild;
    }
    client.resolveRole = (guild, arg) => {
        if (!guild || !arg) {
            return;
        }

        let role = guild.roles.cache.find(r => r.id === arg || r.id === arg.replace('&', '').replace(/<@|>/g, '') || r.name.toLowerCase().startsWith(arg.toLowerCase()) || r.name === arg.toLowerCase());

        return role;
    }

    client.isUnicode = (str) => {
        for (let i = 0, n = str.length; i < n; i++) {
            if (str.charCodeAt( i ) > 255) return true;
            return false;
        }
    }
     /*client.resolveGuildEmoji = async (guild, arg) => {
        if (!guild || !arg) return;
        let emoji = null;
        emoji = guild.emojis.cache.find(e => e.id == arg || e.name == arg) || await guild.getRESTEmoji(arg.replace('<:', '').replace('<a:', '').replace('>', '').split(':')[1]).catch(() => null);
        return emoji;
    }*/
}