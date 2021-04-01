const { MessageEmbed } = require("discord.js")
const axios = require('axios');
module.exports.run = async (client, message, args, settings) => {

    switch (args[0].toLowerCase()) {
        case 'list':
            const emojisListe = message.guild.emojis.cache.map(emojis => emojis.toString());
            let embed = {
                title: `List of emojis for the guild **${message.guild.name}** | ${emojisListe.length} in total`,
                thumbnail: {
                    url: `${message.guild.iconURL()}`,
                },
                color: `${client.config.color.EMBEDCOLOR}`,
                description: null,
                fields: []
            };
            if (emojisListe.join(' ').length > 2048) {
                let i = '';
                emojisListe.forEach(emoji => {
                    if (i.length <= 1024 && i.length + emoji.length > 1024) embed.fields.push({ name: '\u200b', value: i, inline: true });
                    i = i.concat(' ', emoji);
                });
            } else embed.description = emojisListe.join(' ');
            message.channel.send({ embed });
            break;
        case 'create':
            if ((/\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/).test(args[2])) return message.channel.sendErrorMessage(`Vous ne pouvez pas crée un emojis présent sur discord`);
            let base64Image;
            if (args[2] && (/<a?:([a-z0-9-_]+):(\d+)>/gi).test(args[2])) {
                let extension = args[1].startsWith('<a:') ? '.gif' : '.png';
                let emoteLink = `https://cdn.discordapp.com/emojis/${args[2].replace('<:', '').replace('<a:', '').replace('>', '').split(':')[1]}${extension}`;
                const query = await axios({
                    url: emoteLink,
                    responseType: 'arraybuffer'
                }).catch(() => { return });
                let data = Buffer.from(query.data, 'binary');
                base64Image = `data:image/${extension.slice(1)};base64,` + data.toString('base64');
            }
            if (args[2] && (args[2].startsWith('https://') || args[2].startsWith('http://'))) base64Image = args[2];
            if (!args[2] && message.attachments.first()) base64Image = message.attachments.first().url
            const name = args[1]
            if (name.includes(':')) return message.channel.sendErrorMessage(`Name of emoji *(${name})* is invalid.`)
            try {
                emote = await message.channel.guild.emojis.create(base64Image, name);
            } catch (err) {
                if (err.message.match('String value did not match validation regex')) return message.channel.sendErrorMessage(`The name is not valid.`);
                else return message.channel.sendErrorMessage(`An error has occurred. Please try again.`)
            }
            message.channel.send(new MessageEmbed()
                .setTitle(`${client.config.emojis.success} Emoji created`)
                .setColor(client.config.color.VERT)
                .setThumbnail(`https://cdn.discordapp.com/emojis/${emote.id}${emote.animated ? '.gif' : '.png'}`)
                .addField(`Name :`, `${emote.name}`, true)
                .addField(`Emoji :`, `<${emote.animated ? 'a' : ''}:${emote.name}:${emote.id}>`, true)
                .setTimestamp()
                .setFooter('Command module: Administration'));
            break;
        case 'update':
            const emoji = await client.resolveGuildEmoji(message.channel.guild, args[1]);
            if (!emoji) return message.channel.sendErrorMessage(`Emoji not found.`)
            else {
                emoji.edit({
                    name: `${args.slice(2).join(' ').toLowerCase()}`
                })
                message.channel.send(new MessageEmbed()
                    .setTitle(`Emoji update`)
                    .setColor(`${client.config.color.VERT}`)
                    .setThumbnail(`https://cdn.discordapp.com/emojis/${emoji.id}${emoji.animated ? '.gif' : '.png'}`)
                    .addField(`Action :`, `Update`, true)
                    .addField(`Name :`, `${emoji.name}`, true)
                    .setTimestamp()
                    .setFooter(`Command module: Administration`))
            }
            break;
        case 'delete':
            const emojiToDelete = await client.resolveGuildEmoji(message.channel.guild, args[1]);
            if (!emojiToDelete) return message.channel.sendErrorMessage(`Emoji not found.`)
            else {
                emojiToDelete.delete()
                message.channel.send(new MessageEmbed()
                    .setTitle('Emoji delete')
                    .setColor(client.config.color.VERT)
                    .setThumbnail(`https://cdn.discordapp.com/emojis/${emojiToDelete.id}${emojiToDelete.animated ? '.gif' : '.png'}`)
                    .addField(`Action :`, `Delete`, true)
                    .addField(`Name :`, `${emojiToDelete.name}`, true)
                    .setTimestamp()
                    .setFooter(`Command module: Administration`))
            }
            break;
        case 'view':
            const emoteID = await args[1].trim().replace('<:', '').replace('<a:', '').replace('>', '').split(':')[1];
            if (!emoteID) return message.channel.sendErrorMessage(`Emoji not found.`);
            const emoteURL = `https://cdn.discordapp.com/emojis/${emoteID}${args[0].startsWith('<a:') ? '.gif' : '.png'}`;
            message.channel.send(new MessageEmbed()
                .setTitle('Emoji view')
                .setColor(`${client.config.color.EMBEDCOLOR}`)
                .setImage(emoteURL)
                .setTimestamp()
                .setFooter('Command module: Administration'))
            break;
    }

}
module.exports.help = {
    name: 'emojis',
    aliases: ['emojis', 'emoji', 'emots'],
    category: 'administration',
    description: 'Manage emojis of the guild.',
    cooldown: 5,
    usage: '<action> <args>',
    exemple: ["emoji create Spiritus https://domain.com/image.png"],
    moderator: false,
    isUserAdmin: false,
    args: false,
    userPermissions: ['MANAGE_EMOJIS'],
    botPermissions: ['MANAGE_EMOJIS'],
    subcommands: [
        {
            name: 'list',
            description: 'List of moderators roles on the guild.',
            usage: '',
            args: 0,
            exemples: []
        },
        {
            name: 'create',
            description: 'Create an emoji on the guild.',
            usage: '<role>',
            args: 1,
            exemples: ['spiritus https://cdn.discordapp.com/emojis/713122012515532862.png']
        },
        {
            name: 'update',
            description: 'Update emoji on the guild.',
            usage: '<emoji> <name>',
            args: 1,
            exemples: ['spiritus spiritus-emoji']
        },
        {
            name: 'delete',
            description: 'Delete emoji on the guild.',
            usage: '<emoji>',
            args: 1,
            exemples: ['spiritus']
        },
        {
            name: 'view',
            description: 'View an emoji.',
            usage: '<emoji>',
            args: 1,
            exemples: [':spiritus:']
        },
    ]
}
