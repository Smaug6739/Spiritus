module.exports.run = async (client, interaction, args, settings) => {
    switch (args[0].toLowerCase()) {
        case 'add':
            if (args[0].toLowerCase() === 'add') {
                if (settings.reactionroles) {
                    try {
                        const channelRRAdd = client.resolveChannel(interaction.channel.guild, args[1]);
                        if (!channelRRAdd) return interaction.replyErrorMessage(`Channel not found.`);
                        const interactionRRAdd = await channelRRAdd.interactions.fetch(args[2]);
                        if (!interactionRRAdd) return interaction.replyErrorMessage(`interaction not found`);
                        let emoteRRAdd = await client.resolveGuildEmoji(interaction.channel.guild, args[3].trim());
                        if (!emoteRRAdd && client.isUnicode(args[3])) emoteRRAdd = args[3];
                        if (!emoteRRAdd) return interaction.replyErrorMessage(`Emoji not found.`);
                        const role = client.resolveRole(interaction.channel.guild, args[4]);
                        if (!role || role.id == interaction.channel.guild.id) return interaction.replyErrorMessage(`Role not found.`);
                        let existingReactionRole = await settings.reactionroles.find(r => r.emoji == emoteRRAdd.id ? emoteRRAdd.id : emoteRRAdd && r.interactionID == interactionRRAdd.id && r.roleID == role.id)
                        if (existingReactionRole) return interaction.replyErrorMessage(`Emoji already use for this interaction.`);
                        await interactionRRAdd.react(emoteRRAdd.id ? `${emoteRRAdd.name}:${emoteRRAdd.id}` : emoteRRAdd);
                        let arrayRRAdd = settings.reactionroles
                        arrayRRAdd.push({ channelID: channelRRAdd.id, interactionID: interactionRRAdd.id, emoji: emoteRRAdd.id ? emoteRRAdd.id : emoteRRAdd, roleID: role.id })
                        await client.updateGuild(interaction.guild, { reactionroles: arrayRRAdd });
                        interaction.replySuccessMessage(`Role-reaction have been created.`);
                    } catch (e) {
                        if (e.interaction.match('Unknown interaction')) return interaction.replyErrorMessage(`interaction not found`);
                        else return interaction.replyErrorMessage(`An error occurred. Please try again.`);
                    }
                } else return interaction.replyErrorMessage(`An error occurred. Please try again.`)
                break;
            }
        case 'rem':
            const guild = settings
            if (args.length == 2 && args[1] == 'all') {
                settings.reactionroles.splice(0, guild.reactionroles.length);
                guild.save();
                return interaction.replySuccessMessage(`All guild roles-reactions have been deleted`);
            } else {
                try {
                    const channel = client.resolveChannel(interaction.channel.guild, args[1]);
                    if (!channel) return interaction.replyErrorMessage(`Channel not found.`);
                    const interactionRR = await (await client.channels.fetch(channel.id)).interactions.fetch(args[2])
                    if (!interactionRR) return interaction.replyErrorMessage(`interaction not found`);
                    if (!guild.reactionroles.find(r => r.interactionID === interactionRR.id)) return interaction.replyErrorMessage(`There is no role-reaction under this interaction.`);
                    let emojiToRemove = await client.resolveGuildEmoji(interaction.channel.guild, args[3].trim());
                    if (!emojiToRemove && client.isUnicode(args[3])) emojiToRemove = args[3];
                    if (!emojiToRemove) return interaction.replyErrorMessage(`Emoji not found.`);
                    args.splice(0, 4);
                    const role = client.resolveRole(interaction.channel.guild, args.join(' '));
                    if (!role || role.id == interaction.channel.guild.id) return interaction.replyErrorMessage(` Impossible de trouver ce rôle.`);
                    client.updateGuild(interaction.guild, { $pull: { reactionroles: { channelID: channel, interactionID: interactionRR.id, emoji: emojiToRemove, roleID: role.id } } });
                    interaction.replySuccessMessage(`I have deleted this role-reaction.`);
                } catch (e) {
                    if (e.interaction.match('Unknown interaction')) return interaction.replyErrorMessage(`interaction not found`);
                    else return interaction.replyErrorMessage(`An error occurred. Please try again.`);
                }
            }
            break;
    }
};
module.exports.help = {

    name: "reactionroles",
    aliases: ['reactionroles', 'reaction-roles', 'rr'],
    category: 'administration',
    description: "Manage roles-reactions in the guild.",
    cooldown: 10,
    usage: '[paramètre] (valeur)',
    exemple: ['rr add 714041691904016424 732983983377350676 👍 @Role'],
    isUserAdmin: false,
    moderator: false,
    args: true,
    userPermissions: ['MANAGE_GUILD'],
    botPermissions: [],
    subcommands: [
        {
            name: 'add',
            description: 'Add role-reaction in the guild.',
            usage: '<channel> <interaction_id> <emoji> <role>',
            args: 4,
            exemples: ['#general 827084071611662336 👍 @role']
        },
        {
            name: 'rem',
            description: 'Remove role-reaction in the guild.',
            usage: '<channel> <interaction_id> <emoji> <role> | all',
            args: 4,
            exemples: ['#general 827084071611662336 👍 @role', 'all']
        },
    ]
}