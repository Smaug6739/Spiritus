module.exports = client => {
    //const ReactionHandler = require('./ReactionHandler');

    client.console = message =>{
        console.log(message)
    }
    client.resolveMember = async (guild, arg) => {
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
     client.resolveGuildEmoji = async (guild, arg) => {
        if (!guild || !arg) return;
        let emoji = null;
        emoji = guild.emojis.cache.find(e => e.id == arg || e.name == arg) || guild.emojis.cache.find(e => e.id == arg.replace('<:', '').replace('<a:', '').replace('>', '').split(':')[1] ) // await guild.emojis.cache.find(arg.replace('<:', '').replace('<a:', '').replace('>', '').split(':')[1]).catch(() => null);
        return emoji;
        //console.log(guild.emojis.cache.find(e => e.id == '713119015186333716' ))
    }
    client.checkMod = async (member, settings) => {
        let isMod = false;
        if(settings.modRoles){
            settings.modRoles.forEach(modRole => {
                if (member.roles.cache.map(r => r.id).includes(modRole)) isMod = true;
            });
        }
        if (await member.hasPermission('ADMINISTRATOR') || await member.hasPermission('MANAGE_GUILD') || (settings.modRoles && settings.modRoles.length > 0 && isMod)) return true;
        return false;
    }
   /* client.listenToReactionRole = async(client, message, emote, role) => {
        if (!emote.id && !this.isUnicode(emote)) emote = await this.resolveGuildEmoji(message.channel.guild, emote);
        // eslint-disable-next-line new-cap
        const reactionListener = new ReactionHandler.continuousReactionStream(
            message,
            (userID) => !message.channel.guild.members.get(userID).bot,
            true
        );
        reactionListener.on('reacted', async(event) => {
            const user = client.resolveMember(message.channel.guild, event.userID);
            if (user.bot) return;
            if ((event.emoji.id && event.emoji.id !== emote.id) || (!event.emoji.id && event.emoji.name !== emote)) return;
            if (user.roles.includes(role.id)) return user.removeRole(role.id).catch();
            return user.addRole(role.id).catch();
        });
        reactionListener.on('unReacted', async(event) => {
            const user = client.resolveMember(message.channel.guild, event.userID);
            if (user.bot) return;
            if ((event.emoji.id && event.emoji.id !== emote.id) || (!event.emoji.id && event.emoji.name !== emote)) return;
            if (!user.roles.includes(role.id)) return user.addRole(role.id).catch();
            return user.removeRole(role.id).catch();
        });
    }*/
    /*client.banUser = async (delta, msg, user, reason, type) => {
       // if (reason && reason.length > 512) return `${delta.emotes.error} The reason has to be lower than 512 characters`;
        try {
            await client.banGuildMember(msg.channel.guild.id, user.id, 7, encodeURIComponent(reason));
            return `${delta.emotes.success} Successfully banned ${user.username}#${user.discriminator}.`.then(() => this.createModLogCase(this.delta, msg.member, user, type, reason, null));
        } catch (err) {
            if (err.message.match('DiscordRESTError [50013]: Missing Permissions') || err.message.match('DiscordHTTPError [50013]: Missing Permissions')) {
                return `${delta.emotes.error} I can't ban that user, they probably have higher roles than me.`;
            }
        }
    }*/
}