const { MessageEmbed } = require('discord.js')
module.exports.run = (client, message, args) => {

    switch (args[0].toLowerCase()) {
        case 'icon':
            if (!message.attachments.first()) return message.channel.send(`Please send file in attachement.`)
            icon = message.attachments.first().url
            message.guild.setIcon(icon)
                .then(message.channel.sendSuccessMessage(`The icon of the guild has been changed.`))
                .catch(`${client.config.emojis.error}An error has occurred. Please check the file size and try again.`)
            break;
        case 'name':
            let newName = args.slice(1).join(" ")
            if (newName.length < 2) return message.channel.sendErrorMessage(`The name must be at least 2 characters long.`)
            message.guild.setName(newName)
                .then(message.channel.sendSuccessMessage(`The name of the guild has been changed with \`${newName}\``))
            break;
        case 'moderation':
            let newLevel = args[1];
            let levelEdit = '';
            if (args[1] != 1 && args[1] != 2 && args[1] != 3 && args[1] != 4 && args[1] != 5) return message.channel.sendErrorMessage(` Merci d'indiquer une valeur entre 1 et 5`)
            if (newLevel === '1') levelEdit = 'NONE'
            if (newLevel === '2') levelEdit = 'LOW'
            if (newLevel === '3') levelEdit = 'MEDIUM'
            if (newLevel === '4') levelEdit = 'HIGH'
            if (newLevel === '5') levelEdit = 'VERY_HIGH'
            message.guild.edit({ verificationLevel: levelEdit })
                .then(message.channel.sendSuccessMessage(`I have updated the moderation level of the server by \`${newLevel}\``))
            break;

        case 'invite-create':
            message.channel.createInvite().then(invite =>
                invite.channel.send(new MessageEmbed()
                    .setAuthor('Creating an invitation')
                    .setColor(client.config.color.EMBEDCOLOR)
                    .setDescription(`An invitation was created with the code \`${invite.code}\``)
                    .addFields({ name: '\u200b', value: `https://discord.gg/${invite.code}`, inline: false })
                    .setTimestamp())
            ).catch(console.error);
            break;
        case 'webhook-create':
            message.channel.createWebhook('Webhook', {
                reason: 'Creating an webhook'
            }).then(webhook =>
                client.channels.cache.get(webhook.channelID).send(new MessageEmbed()
                    .setAuthor('Creating an webhook')
                    .setColor(client.config.color.EMBEDCOLOR)
                    .setThumbnail(message.guild.iconURL())
                    .setDescription(`__Name :__ ${webhook.name}\n__ID :__ ${webhook.id}\n__Type :__ ${webhook.type}\n__Guild :__ ${webhook.guildID}\n__Channel :__ ${webhook.channelID}`))
            ).catch(console.error);
            break;
    }
}
module.exports.help = {
    name: 'server',
    aliases: ['server'],
    category: 'administration',
    description: 'Commands for manage server settings.',
    cooldown: 5,
    usage: '<action> <value>',
    exemple: ['server name Spiritus'],
    moderator: false,
    isUserAdmin: false,
    args: true,
    userPermissions: ['MANAGE_GUILD'],
    botPermissions: ['MANAGE_GUILD', 'CREATE_INSTANT_INVITE', 'MANAGE_WEBHOOKS'],
    subcommands: [
        {
            name: 'icon',
            description: 'Change the icon of the guild',
            usage: '[attachement]',
            args: 0,
            exemples: []
        },
        {
            name: 'name',
            description: 'Change the name of the guild',
            usage: '<name>',
            args: 1,
            exemples: ['Spiritus support']
        },
        {
            name: 'moderation',
            description: 'Change the moderation level of the guild',
            usage: '<level>',
            args: 1,
            exemples: ['3']
        },
        {
            name: 'invite-create',
            description: 'Create invitation on the guild',
            usage: '',
            args: 0,
            exemples: []
        },
        {
            name: 'webhook-create',
            description: 'Create webhook on the channel where the command is typing.',
            usage: '',
            args: 0,
            exemples: []
        },
    ]
}

