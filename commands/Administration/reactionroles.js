module.exports.run = async (client, message, args, settings) => {
    switch (args[0].toLowerCase()) {
        case 'add':
            if (args[0].toLowerCase() === 'add') {
                if (settings.reactionroles) {
                    try {
                        const channelRRAdd = client.resolveChannel(message.channel.guild, args[1]);
                        if (!channelRRAdd) return message.channel.sendErrorMessage(` Je n'ai pas trouver ce channel.`);
                        const messageRRAdd = await message.channel.messages.fetch(args[2]);
                        if (!messageRRAdd) return message.channel.sendErrorMessage(`Message not found`);
                        let emoteRRAdd = await client.resolveGuildEmoji(message.channel.guild, args[3].trim());
                        if (!emoteRRAdd && client.isUnicode(args[3])) emoteRRAdd = args[3];
                        if (!emoteRRAdd) return message.channel.sendErrorMessage(`Emoji not found.`);
                        args.splice(0, 4);
                        const role = client.resolveRole(message.channel.guild, args[4]);
                        if (!role || role.id == message.channel.guild.id) return message.channel.sendErrorMessage(`Impossible de trouver ce rôle.`);
                        let existingReactionRole = await settings.reactionroles.find(r => r.emoji == emoteRRAdd.id ? emoteRRAdd.id : emoteRRAdd && r.messageID == messageRRAdd.id && r.roleID == role.id)
                        if (existingReactionRole) return message.channel.sendErrorMessage(` Cet émoji est déja associé a un role sous ce message.`);
                        await messageRRAdd.react(emoteRRAdd.id ? `${emoteRRAdd.name}:${emoteRRAdd.id}` : emoteRRAdd);
                        let arrayRRAdd = settings.reactionroles
                        arrayRRAdd.push({ channelID: channelRRAdd.id, messageID: messageRRAdd.id, emoji: emoteRRAdd.id ? emoteRRAdd.id : emoteRRAdd, roleID: role.id })
                        await client.updateGuild(message.guild, { reactionroles: arrayRRAdd });
                        message.channel.sendSuccessMessage(`Role-reaction have been created.`);
                    } catch (e) {
                        if (e.message.match('Unknown Message')) return message.channel.sendErrorMessage(`Message not found`);
                        else return message.channel.sendErrorMessage(`An error occurred. Please try again.`);
                    }
                } else return message.channel.sendErrorMessage(`An error occurred. Please try again.`)
                break;
            }
        case 'rem':
            const guild = settings
            if (args.length == 2 && args[1] == 'all') {
                settings.reactionroles.splice(0, guild.reactionroles.length);
                guild.save();
                return message.channel.sendSuccessMessage(`All guild roles-reactions have been deleted`);
            } else {
                try {
                    const channel = client.resolveChannel(message.channel.guild, args[1]);
                    if (!channel) return message.channel.sendErrorMessage(` Je n'ai pas trouver ce channel.`);
                    const messageRR = await (await client.channels.fetch(channel.id)).messages.fetch(args[2])
                    if (!messageRR) return message.channel.sendErrorMessage(`Message not found`);
                    if (!guild.reactionroles.find(r => r.messageID === messageRR.id)) return message.channel.sendErrorMessage(`There is no role-reaction under this message.`);
                    let emote = await client.resolveGuildEmoji(message.channel.guild, args[3].trim());
                    if (!emote && client.isUnicode(args[3])) emote = args[3];
                    if (!emote) return message.channel.sendErrorMessage(`Emoji not found.`);
                    args.splice(0, 4);
                    const role = client.resolveRole(message.channel.guild, args.join(' '));
                    if (!role || role.id == message.channel.guild.id) return message.channel.sendErrorMessage(` Impossible de trouver ce rôle.`);
                    client.updateGuild(message.guild, { $pull: { reactionroles: { channelID: channel, messageID: messageRR.id, emoji: emote, roleID: role.id } } });
                    message.channel.sendSuccessMessage(`I have deleted this role-reaction.`);
                } catch (e) {
                    if (e.message.match('Unknown Message')) return message.channel.sendErrorMessage(`Message not found`);
                    else return message.channel.sendErrorMessage(`An error occurred. Please try again.`);
                }
            }
            break;

    }
    if (args[0].toLowerCase() === 'rem') {


    }

};
module.exports.help = {

    name: "reactionroles",
    aliases: ['reactionroles', 'reaction-roles', 'rr'],
    category: 'administration',
    description: "Permet de gérer les roles reactions du serveur.",
    cooldown: 10,
    usage: '[paramètre] (valeur)',
    exemple: ['rr add 714041691904016424 732983983377350676 👍 @Role'],
    isUserAdmin: false,
    moderator: false,
    args: true,
    userPermissions: ['MANAGE_GUILD'],
    botPermissions: [],
    subcommands: ["rr add", "rr rem"]
}