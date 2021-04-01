module.exports.run = async (client, message, args) => {
    switch (args[0].toLowerCase()) {

        case 'create':
            if (args[1] == 'text' || args[1] == 'voice') {
                try {
                    let nameChannel = args.splice(2).join('-')
                    if (!nameChannel) return message.channel.sendErrorMessage(`Please send name of channel.`);
                    if (nameChannel.length > 99) return message.channel.sendErrorMessage(`Name of category is invalid (max 100 chars)`);
                    message.guild.channels.create(`${nameChannel}`, {
                        type: `${args[1]}`,
                    }).then(chan => {
                        chan.setParent(category).then(() => {
                        }).then(message.channel.sendSuccessMessage(`I have created ${nameChannel}`))
                            .catch(console.error);
                    })
                        .catch(console.error);
                } catch (err) { return message.channel.sendErrorMessage(`An error occured. Please try again.`) };
            } else if (args[1] == 'category') {
                let nom_category = args.splice(2).join(' ')
                if (nom_category.length > 99) return message.channel.sendErrorMessage(`Name of category is invalid (max 100 chars)`);
                message.guild.channels.create(`${nom_category}`, {
                    type: `${'category'}`,

                }).then(message.channel.sendSuccessMessage(`I have created category \`${nom_category}\``))
                    .catch(console.error)

            } else {
                return message.channel.sendErrorMessage(`Please give a valid value as the first argument (\`text\` ou \`voice\` or \`category\`)`)
            }
            break;
        case 'update':
            if (!args[2]) return message.channel.sendErrorMessage(`Please specify the new name of the channel to modify`)
            const channelToUpdate = await client.resolveChannel(message.guild, args[1])
            if (!channelToUpdate) return message.channel.sendErrorMessage(`Channel not found`)
            try {
                await channelToUpdate.edit({ name: args.slice(2).join("-") }).then(
                    message.channel.sendSuccessMessage(`I have updated the channel \`${channelToUpdate.name}\``)
                )
            } catch (err) { return message.channel.sendErrorMessage(`An error occurred please try again.`) }
            break;
        case 'delete':
            const channelToDelete = client.resolveChannel(message.guild, args.slice(1).join('-'))
            if (!channelToDelete) return message.channel.sendErrorMessage(`Channel not found`)
            try {
                channelToDelete.delete().then(message.channel.sendSuccessMessage(`I have deleted the channel ${channelToDelete.name}`))
            } catch (err) { return message.channel.sendErrorMessage(`An error occured. Please try again.`) }
            break;
        case 'clone':
            const channelToClone = client.resolveChannel(message.guild, args[1])
            if (!channelToClone) return message.channel.sendErrorMessage(`Channel not found`)
            try {
                channelToClone.clone().then(message.channel.sendSuccessMessage(`I clone the channel \`${channelToClone.name}\``))
            } catch (err) { return message.channel.sendErrorMessage(`An error occured. Please try again.`) };
            break;
        case 'synchro':
            const channelToSynchro = client.resolveChannel(message.guild, args[1])
            if (!channelToSynchro) return message.channel.sendErrorMessage(`Channel not found`)
            if (!channelToSynchro.parent) return message.channel.sendErrorMessage(`This channel not have category.`)
            try {
                channelToSynchro.lockPermissions()
                    .then(message.channel.sendSuccessMessage(`I have synchronized the permissions of the channel ${channelToSynchro.name} with category permissions ${channelToSynchro.parent.name}`))
            } catch (err) { message.channel.sendErrorMessage(`An error occurred please try again`) }
            break;
        case 'position':
            if (!args[2]) return message.channel.sendErrorMessage(`Please specify the new channel position`)
            const channelPosition = client.resolveChannel(message.guild, args[1])
            if (!channelPosition) return message.channel.sendErrorMessage(`Channel not found`)
            let positionNew = args[2]
            if (isNaN(positionNew)) return message.channel.sendErrorMessage(`Please enter a valid number for the channel position`)
            if (channelPosition) {
                try {
                    await channelPosition.setPosition(positionNew - 1).then(message.channel.sendSuccessMessage(`I have updated the position of channel \`${channelPosition.name}\``))
                } catch (err) { message.channel.sendErrorMessage(`An error occurred. Please try again.`) }
            }
            break;
        case 'parent':
            if (!args[2]) return message.channel.sendErrorMessage(`Please specify the new channel position.`)
            const channelParent = client.resolveChannel(message.guild, args[1])
            if (!channelParent) return message.channel.sendErrorMessage(`Channel not found`)
            let category = client.resolveChannel(message.guild, args.slice(2).join(" "))
            if (category == undefined) return message.channel.sendErrorMessage(`Category not found.`)
            if (isNaN(category)) return message.channel.sendErrorMessage(`Please enter a valid ID for the new category of the show`)
            try {
                await channelParent.setParent(category).then(message.channel.sendSuccessMessage(`I have updated the position of channel \`${channelParent.name}\``))
            } catch (err) { message.channel.sendErrorMessage(`An error occurred. Please try again.`) }
            break;
        case 'topic':
            if (!args[2]) return message.channel.sendErrorMessage(`Merci de spécifier le nouveau topic`)
            const channelTopic = client.resolveChannel(message.guild, args[1])
            if (!channelTopic) return message.channel.sendErrorMessage(`Channel not found`)
            let newTopic = args.slice(2).join(" ")
            if (newTopic.length > 1020) return message.channel.sendErrorMessage(`You cannot create a topic longer than 1024 characters`)
            try {
                await channelTopic.setTopic(newTopic).then(message.channel.sendSuccessMessage(`I have updated the topic of channel \`${channelTopic.name}\``))
            } catch (err) { message.channel.sendErrorMessage(`An error occurred. Please try again.`) }
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