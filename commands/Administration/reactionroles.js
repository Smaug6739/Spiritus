const { MessageEmbed} = require("discord.js");
module.exports.run = async (client, message, args, settings) => {
    if(args[0].toLowerCase() === 'add'){
        const rrCreateDescription = new MessageEmbed()
            .setTitle(`Sous commande : ${settings.prefix}reaction-role add`)
            .setColor(client.config.color.EMBEDCOLOR)
            .setDescription(`**Module :** Manangement\n**Description :** Permet de crée un role-reaction sous un message.\n**Usage :** [channel] [message_ID] [emoi] [role]\n**Exemples :** \n ${settings.prefix}role-reaction add 716993025678639124 728683365712265257 <:Z6158981175244605Z6:713121641701572698> @Update`)
            .setFooter('BOT ID : 689210215488684044')
            .setTimestamp()
            if(args.length < 5)return message.channel.send(rrCreateDescription)
        if(settings.reactionroles){
            const guild = settings
            const channel = client.resolveChannel(message.channel.guild, args[1]);
            if (!channel) return message.channel.send(`${client.config.emojis.FALSE} Je n'ai pas trouver ce channel.`);
            const messageV = await (await client.channels.fetch(channel.id)).messages.fetch(args[2])//await channel.getMessage(args[1].trim().catch(() => undefined));
            if (!messageV) return message.channel.send(`${client.config.emojis.FALSE} Je n'ai pas trouver ce message.`);
            let emote = await client.resolveGuildEmoji(message.channel.guild, args[3].trim());
            if (!emote && client.isUnicode(args[3])) emote = args[3];
            if (!emote) return message.channel.send(`${client.config.emojis.FALSE} Je n'ai pas trouver cet emoji.`);
            args.splice(0, 4);
            const role = client.resolveRole(message.channel.guild, args.join(' '));
            if (!role || role.id == message.channel.guild.id) return message.channel.send(`${client.config.emojis.FALSE} Impossible de trouver ce rôle.`);
            let existingReactionRole = await settings.reactionroles.find(r => r.emoji == emote.id ? emote.id : emote && r.messageID == messageV.id && r.roleID == role.id)
            if(existingReactionRole)return message.channel.send(`${client.config.emojis.FALSE} Cet émoji est déja associé a un role sous ce message.`);
            //.find(r => r.emoji == emote && r.messageID == message.id);
            //if (existingReactionRole) return message.channel.send(`${client.config.emojis.FALSE} Il  y a déja un role associé a cet emoji sous ce message.`);
            await messageV.react(emote.id ? `${emote.name}:${emote.id}` : emote);
            let tableau = []
            tableau = settings.reactionroles
            tableau.push({channelID: channel.id, messageID: messageV.id, emoji: emote.id ? emote.id : emote, roleID: role.id })
        // await client.updateGuild(message.guild, { reactionroles: [{channelID: channel.id, messageID: messageV.id, emoji: emote.id ? emote.id : emote, roleID: role.id }]});
            await client.updateGuild(message.guild, { reactionroles: tableau});
            //await delta.db.Guild.updateOne({ ID: msg.channel.guild.id }, { $addToSet: { reactionRoles: [{channelID: channel.id, messageID: message.id, emoji: emote.id ? emote.id : emote, roleID: role.id }]}});
            //await client.listenToReactionRole(client, message, emote, role);
            message.channel.send(`${client.config.emojis.TRUE}J'ai bien crée un role-reaction sous ce message `);
        /* const newGuild = await delta.db.Guild.findOne({ ID: msg.channel.guild.id });
            let dbRole = newGuild.reactionRoles.find(a => a.messageID == message.id && (a.emoji == emote.id || a.emoji == emote));
            if (!newGuild.reactionRoles.length < 0) return msg.channel.sendErrorMessage('An error occured while creating reaction roles, please report it to the developers.');
            let embed = { color: delta.constants.colors.green, title: `${delta.emotes.success} Reaction Role Created`, fields: [] };
            const canal = msg.channel.guild.channels.get(dbRole.channelID);
            embed.fields.push({ name: 'Channel', value: canal.mention, inline: true });
            const messge = canal.getMessage(dbRole.messageID).catch(() => undefined);
            embed.fields.push({ name: 'Message', value: `[Jump to message](https://discordapp.com/channels/${msg.channel.guild.id}/${canal.id}/${messge.id})`, inline: true});
            let emoji = await delta.utils.resolveGuildEmoji(msg.channel.guild, dbRole.emoji);
            if (!emoji.id && !this.isUnicode(emoji)) emoji = await this.resolveGuildEmoji(message.channel.guild, emoji);
            embed.fields.push({ name: 'Emoji', value: emoji ? `<${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.id}>` : dbRole.emoji, inline: true});
            const rol = msg.channel.guild.roles.get(dbRole.roleID);
            embed.fields.push({ name: 'Role', value: rol.mention, inline: true });
            return msg.channel.createMessage({ embed });*/
        }else{
            return message.channel.send(`${client.config.emojis.FALSE}Une erreur s'est produite merci de réessayer.`)
        }
    }
    if(args[0].toLowerCase() === 'rem'){

        const guild = settings
        if (args.length == 2 && args[1] == 'all') {
            settings.reactionroles.splice(0, guild.reactionroles.length);
            guild.save();
            return message.channel.send(`${client.config.emojis.TRUE}Tous les roles-reactions du serveur ont bien été supprimés`);
        }else{
            const rrDeleteDescription = new MessageEmbed()
            .setTitle(`Sous commande : ${settings.prefix}reaction-role rem`)
            .setColor(client.config.color.EMBEDCOLOR)
            .setDescription(`**Module :** Manangement\n**Description :** Permet de crée un role-reaction sous un message.\n**Usage :** [channel] [message_ID] [emoi] [role]\n**Exemples :** \n ${settings.prefix}role-reaction rem 716993025678639124 728683365712265257 <:Z6158981175244605Z6:713121641701572698> @Update`)
            .setFooter('BOT ID : 689210215488684044')
            .setTimestamp()
            if(args.length < 5)return message.channel.send(rrDeleteDescription)
            const channel = client.resolveChannel(message.channel.guild, args[1]);
            if (!channel) return message.channel.send(`${client.config.emojis.FALSE} Je n'ai pas trouver ce channel.`);
            const messageV = await (await client.channels.fetch(channel.id)).messages.fetch(args[2])//await channel.getMessage(args[1].trim().catch(() => undefined));
            //const message = await channel.getMessage(args[2]).catch(() => undefined);
            if (!messageV) return message.channel.send(`${client.config.emojis.FALSE} Je n'ai pas trouver ce message.`);
            if (!guild.reactionroles.find(r => r.messageID === messageV.id)) return message.channel.send(`${client.config.emojis.FALSE} Il n'y a pas de role-reaction sous ce message.`);
            let emote = await client.resolveGuildEmoji(message.channel.guild, args[3].trim());
            if (!emote && client.isUnicode(args[3])) emote = args[3];
            if (!emote) return message.channel.send(`${client.config.emojis.FALSE} Je n'ai pas trouver cet emoji.`);
            args.splice(0, 4);
            const role = client.resolveRole(message.channel.guild, args.join(' '));
            if (!role || role.id == message.channel.guild.id) return message.channel.send(`${client.config.emojis.FALSE} Impossible de trouver ce rôle.`);
            //await message.removeReactions();
            //await settings.updateOne({ ID: message.channel.guild.id }, { $pull: {messageID: message.id} });
            client.updateGuild(message.guild, {$pull:{ reactionroles: {channelID:channel,messageID: messageV.id,emoji:emote,roleID:role.id} }});
            return message.channel.send(`${client.config.emojis.TRUE} J'ai bien supprimer ce role reaction.`);
           // console.log(del)
        }

    }

};
module.exports.help = {

    name: "reactionroles",
    aliases: ['reactionroles','reaction-roles','rr'],
    category: 'administration',
    description: "Permet de gérer les roles reactions du serveur.",
    cooldown: 10,
    usage: '[paramètre] (valeur)',
    exemple :['add 714041691904016424 732983983377350676 👍 @Role'],
    isUserAdmin: false,
    permissions: true,
    args: true,
    sousCommdandes : ["rr add","rr rem"]
} 