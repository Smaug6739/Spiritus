module.exports.run = async (client, interaction, args) => {
    switch (args[0].toLowerCase()) {

        case 'create':
            if (args[1] == 'text' || args[1] == 'voice') {
                try {
                    let nameChannel = args.splice(2).join('-')
                    if (!nameChannel) return interaction.replyErrorMessage(`Please send name of channel.`);
                    if (nameChannel.length > 99) return interaction.replyErrorMessage(`Name of category is invalid (max 100 chars)`);
                    interaction.guild.channels.create(`${nameChannel}`, {
                        type: `${args[1]}`,
                    }).then(chan => {
                        chan.setParent(category).then(() => {
                        }).then(interaction.replySuccessMessage(`I have created ${nameChannel}`))
                            .catch(console.error);
                    })
                        .catch(console.error);
                } catch (err) { return interaction.replyErrorMessage(`An error occured. Please try again.`) };
            } else if (args[1] == 'category') {
                let nom_category = args.splice(2).join(' ')
                if (nom_category.length > 99) return interaction.replyErrorMessage(`Name of category is invalid (max 100 chars)`);
                interaction.guild.channels.create(`${nom_category}`, {
                    type: `${'category'}`,

                }).then(interaction.replySuccessMessage(`I have created category \`${nom_category}\``))
                    .catch(console.error)

            } else {
                return interaction.replyErrorMessage(`Please give a valid value as the first argument (\`text\` ou \`voice\` or \`category\`)`)
            }
            break;
        case 'update':
            if (!args[2]) return interaction.replyErrorMessage(`Please specify the new name of the channel to modify`)
            const channelToUpdate = await client.resolveChannel(interaction.guild, args[1])
            if (!channelToUpdate) return interaction.replyErrorMessage(`Channel not found`)
            try {
                await channelToUpdate.edit({ name: args.slice(2).join("-") }).then(
                    interaction.replySuccessMessage(`I have updated the channel \`${channelToUpdate.name}\``)
                )
            } catch (err) { return interaction.replyErrorMessage(`An error occurred please try again.`) }
            break;
        case 'delete':
            const channelToDelete = client.resolveChannel(interaction.guild, args.slice(1).join('-'))
            if (!channelToDelete) return interaction.replyErrorMessage(`Channel not found`)
            try {
                channelToDelete.delete().then(interaction.replySuccessMessage(`I have deleted the channel ${channelToDelete.name}`))
            } catch (err) { return interaction.replyErrorMessage(`An error occured. Please try again.`) }
            break;
        case 'clone':
            const channelToClone = client.resolveChannel(interaction.guild, args[1])
            if (!channelToClone) return interaction.replyErrorMessage(`Channel not found`)
            try {
                channelToClone.clone().then(interaction.replySuccessMessage(`I clone the channel \`${channelToClone.name}\``))
            } catch (err) { return interaction.replyErrorMessage(`An error occured. Please try again.`) };
            break;
        case 'synchro':
            const channelToSynchro = client.resolveChannel(interaction.guild, args[1])
            if (!channelToSynchro) return interaction.replyErrorMessage(`Channel not found`)
            if (!channelToSynchro.parent) return interaction.replyErrorMessage(`This channel not have category.`)
            try {
                channelToSynchro.lockPermissions()
                    .then(interaction.replySuccessMessage(`I have synchronized the permissions of the channel ${channelToSynchro.name} with category permissions ${channelToSynchro.parent.name}`))
            } catch (err) { interaction.replyErrorMessage(`An error occurred please try again`) }
            break;
        case 'position':
            if (!args[2]) return interaction.replyErrorMessage(`Please specify the new channel position`)
            const channelPosition = client.resolveChannel(interaction.guild, args[1])
            if (!channelPosition) return interaction.replyErrorMessage(`Channel not found`)
            let positionNew = args[2]
            if (isNaN(positionNew)) return interaction.replyErrorMessage(`Please enter a valid number for the channel position`)
            if (channelPosition) {
                try {
                    await channelPosition.setPosition(positionNew - 1).then(interaction.replySuccessMessage(`I have updated the position of channel \`${channelPosition.name}\``))
                } catch (err) { interaction.replyErrorMessage(`An error occurred. Please try again.`) }
            }
            break;
        case 'parent':
            if (!args[2]) return interaction.replyErrorMessage(`Please specify the new channel position.`)
            const channelParent = client.resolveChannel(interaction.guild, args[1])
            if (!channelParent) return interaction.replyErrorMessage(`Channel not found`)
            let category = client.resolveChannel(interaction.guild, args.slice(2).join(" "))
            if (category == undefined) return interaction.replyErrorMessage(`Category not found.`)
            if (isNaN(category)) return interaction.replyErrorMessage(`Please enter a valid ID for the new category of the show`)
            try {
                await channelParent.setParent(category).then(interaction.replySuccessMessage(`I have updated the position of channel \`${channelParent.name}\``))
            } catch (err) { interaction.replyErrorMessage(`An error occurred. Please try again.`) }
            break;
        case 'topic':
            if (!args[2]) return interaction.replyErrorMessage(`Merci de spécifier le nouveau topic`)
            const channelTopic = client.resolveChannel(interaction.guild, args[1])
            if (!channelTopic) return interaction.replyErrorMessage(`Channel not found`)
            let newTopic = args.slice(2).join(" ")
            if (newTopic.length > 1020) return interaction.replyErrorMessage(`You cannot create a topic longer than 1024 characters`)
            try {
                await channelTopic.setTopic(newTopic).then(interaction.replySuccessMessage(`I have updated the topic of channel \`${channelTopic.name}\``))
            } catch (err) { interaction.replyErrorMessage(`An error occurred. Please try again.`) }
            break;
    }
}
module.exports.help = {
    name: "channel",
    aliases: ['channel', 'channels', 'salon', 'salons'],
    category: 'administration',
    description: "Manage channels of the guild",
    cooldown: 5,
    usage: '<action> <args>',
    exemple: [],
    isUserAdmin: false,
    moderator: false,
    args: false,
    userPermissions: ['MANAGE_CHANNELS'],
    botPermissions: ['MANAGE_CHANNELS'],
    subcommands: [
        {
            name: 'create',
            description: 'Create channel on the guild.',
            usage: '<type> <name>',
            args: 2,
            exemples: ['text general', 'category welcome']
        },
        {
            name: 'update',
            description: 'Update channel on the guild.',
            usage: '<channel> <name>',
            args: 2,
            exemples: ['general chat']
        },
        {
            name: 'delete',
            description: 'Delete channel on the guild.',
            usage: '<channel>',
            args: 1,
            exemples: ['#chat', 'general']
        },
        {
            name: 'clone',
            description: 'Clone an channel of the guild.',
            usage: '<channel>',
            args: 1,
            exemples: ['#chat', 'general']
        },
        {
            name: 'synchro',
            description: 'Synchronize the permissions of a channel.',
            usage: '<channel>',
            args: 1,
            exemples: ['support', 'all']
        },
        {
            name: 'position',
            description: 'Change order of channel.',
            usage: '<channel> <position>',
            args: 2,
            exemples: ['#general 5', 'chat 10']
        },
        {
            name: 'parent',
            description: 'Change category of channel.',
            usage: '<channel> <parent_id>',
            args: 2,
            exemples: ['#general 816388014766817331', 'chat 816388014766817331']
        },
        {
            name: 'topic',
            description: 'Change topic of channel.',
            usage: '<channel> <topic>',
            args: 2,
            exemples: ['#general new topic', 'chat new topic']
        },
    ]
};