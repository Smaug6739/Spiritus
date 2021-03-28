const { MessageEmbed } = require("discord.js")
const axios = require('axios');
module.exports.run = async (client, message, args, settings) => {
    if (!args[0]) {
        const embed = new MessageEmbed()
            .setTitle('Commande emoji')
            .setDescription(`La commande __emoji__ permet de gérer les emojis du serveur graces aux sous commandes suivantes :\n\n${client.config.emojis.fleche}__emoji liste__ permet voir les emojis du serveur.\n${client.config.emojis.fleche}__emoji create__ permet de crée un emoji.\n${client.config.emojis.fleche}__emoji delete__ permet de supprimer un emoji.`)
            .setColor(`${client.config.color.EMBEDCOLOR}`)
            .setTimestamp()
            .setFooter('BOT ID : 689210215488684044')
        return message.channel.send(embed)
    }
    if (args[0].toLowerCase() === 'liste') {
        /* const emojisList = message.channel.guild.emojis.cache.map(emote => `<${emote.animated ? 'a' : ''}:${emote.name}:${emote.id}>`);
         let embed = new MessageEmbed()
         .setTitle(`Liste des emojis pour le serveur **${message.guild.name}** | ${emojisList.length} totale`)
         .setColor(client.config.color.VERT)
         .setDescription(emojisList.slice(0, 60).join(' '))
         .setFooter(`BOT ID : ${client.user.id}`)
         .setTimestamp()
         message.channel.send(embed)*/
        const emojisListe = message.guild.emojis.cache.map(emojis => emojis.toString());
        let embed = {
            title: `Liste des emojis pour le serveur **${message.guild.name}** | ${emojisListe.length} au totale`,
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
        return message.channel.send({ embed });

        //--------------------------------------EMOJIS-CREATE------------------------------------------------------
    } else if (args[0].toLowerCase() === 'create') {
        if (!message.member.permissions.has('MANAGE_EMOJIS')) return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de gérer les emojis pour utiliser cette commande.`);
        if (!message.guild.me.permissions.has('MANAGE_EMOJIS')) return message.channel.send(`${client.config.emojis.error}Je n'ai pas la permission de gérer les emojis.`);
        if (args.length < 3 && !message.attachments.first()) {
            const emojiCreateDescription = new MessageEmbed()
                .setTitle(`Sous commande : ${settings.prefix}emoji create`)
                .setColor(client.config.color.EMBEDCOLOR)
                .setDescription(`**Module :** Manangement\n**Description :** Permet de crée un emoji sur le serveur\n**Usage : **${settings.prefix}emoji create [nom] (URL/Attachement)\n**Exemples :** \n ${settings.prefix}emoji create Spiritus https://cdn.discordapp.com/emojis/713121641701572698.png`)
                .setFooter('BOT ID : 689210215488684044')
                .setTimestamp()
            return message.channel.send(emojiCreateDescription)
        }
        if (args[1].length < 2) return message.channel.send(`${client.config.emojis.error}Le nom de l'emoji doit contenir au moins 2 caractères `);
        if ((/\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/).test(args[2])) return message.channel.send(`${client.config.emojis.FALSE}Vous ne pouvez pas crée un emojis présent sur discord`);
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
        if (args[2] && (args[2].startsWith('https://') || args[2].startsWith('http://'))) {
            let extension = args[2].includes('.gif') ? 'gif' : 'png';
            const query = await axios({
                url: args[2],
                responseType: 'arraybuffer'
            }).catch(_ => { return message.channel.send(`${client.config.emojis.error}URL invalide`) })
            base64Image = args[2];
        }
        if (!args[2] && message.attachments.first()) {
            let extension = message.attachments.first().url.endsWith('.gif') ? 'gif' : 'png';
            const query = await axios({
                url: message.attachments.first().url,
                responseType: 'arraybuffer',
            });
            base64Image = message.attachments.first().url
        }
        name = args[1]
        if (name.includes(':')) return message.channel.send(`${client.config.emojis.error}Nom de l'emoji *(${name})* est invalide.`)
        try {
            emote = await message.channel.guild.emojis.create(base64Image, name);
        } catch (err) {
            if (err.message.match('String value did not match validation regex')) return message.channel.send(`${client.config.emojis.error}Le nom de l'emoji n'est pas valide.`);
            else {
                message.channel.send(`${client.config.emojis.error}Une erreur s'est produite. Merci de réessayer.`)
                return client.channels.cache.get('725251200660013136').send(`Une erreur sur la commande \`emoji-create\` s'est produite sur le serveur : ${message.guild.name}.\nContenu du message : \`${message.content}\`\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
            }
        }
        const embed = new MessageEmbed()
            .setTitle(`${client.config.emojis.success} Emoji created`)
            .setColor(client.config.color.VERT)
            .setThumbnail(`https://cdn.discordapp.com/emojis/${emote.id}${emote.animated ? '.gif' : '.png'}`)
            .addField(`Nom :`, `${emote.name}`, true)
            .addField(`Emoji :`, `<${emote.animated ? 'a' : ''}:${emote.name}:${emote.id}>`, true)
            .setTimestamp()
            .setFooter('BOT ID : 689210215488684044')
        return message.channel.send(embed);
        //-------------------------------------------EMOJIS-DELETE----------------------------------------------------
    } else if (args[0].toLowerCase() === 'update') {
        if (!message.member.permissions.has('MANAGE_EMOJIS')) return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de gérer les emojis pour utiliser cette commande.`);
        if (!message.guild.me.permissions.has('MANAGE_EMOJIS')) return message.channel.send(`${client.config.emojis.error}Je n'ai pas la permission de gérer les emojis.`);
        const emojiUpdateDescription = new MessageEmbed()
            .setTitle(`Sous commande : ${settings.prefix}emoji update`)
            .setColor(client.config.color.EMBEDCOLOR)
            .setDescription(`**Module :** Manangement\n**Description :** Permet de mettre à jour un emoji sur le serveur\n**Usage : **${settings.prefix}emoji update [nom/emoji/id]\n**Exemples :** \n ${settings.prefix}emoji update Bot Spiritus`)
            .setFooter(`BOT ID : ${client.user.id}`)
            .setTimestamp()
        if (!args[2]) return message.channel.send(emojiUpdateDescription)
        const emoji = await client.resolveGuildEmoji(message.channel.guild, args[1]);
        if (!emoji) return message.channel.send(`${client.config.emojis.error}Je n'ai pas trouver cet emoji.`)
        else {
            emoji.edit({
                name: `${args.slice(2).join(' ').toLowerCase()}`
            })
            const successEmbed = new MessageEmbed()
                .setTitle(`Emoji update`)
                .setColor(`${client.config.color.EMBEDCOLOR}`)
                .setThumbnail(`https://cdn.discordapp.com/emojis/${emoji.id}${emoji.animated ? '.gif' : '.png'}`)
                .addField(`Action :`, `Update`, true)
                .addField(`Nom :`, `${emoji.name}`, true)
                .setTimestamp()
                .setFooter(`BOT ID : ${client.user.id}`)
            message.channel.send(successEmbed)
        }
    } else if (args[0].toLowerCase() === 'delete') {
        if (!message.member.permissions.has('MANAGE_EMOJIS')) return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de gérer les emojis pour utiliser cette commande.`);
        if (!message.guild.me.permissions.has('MANAGE_EMOJIS')) return message.channel.send(`${client.config.emojis.error}Je n'ai pas la permission de gérer les emojis.`);
        const emojiDeleteDescription = new MessageEmbed()
            .setTitle(`Sous commande : ${settings.prefix}emoji delete`)
            .setColor(client.config.color.EMBEDCOLOR)
            .setDescription(`**Module :** Manangement\n**Description :** Permet de supprimer un emoji sur le serveur\n**Usage : **${settings.prefix}emoji delete [nom]\n**Exemples :** \n ${settings.prefix}emoji delete Spiritus`)
            .setFooter('BOT ID : 689210215488684044')
            .setTimestamp()
        if (!args[1]) return message.channel.send(emojiDeleteDescription)
        const emoji = await client.resolveGuildEmoji(message.channel.guild, args[1]);
        if (!emoji) return message.channel.send(`${client.config.emojis.error}Je n'ai pas trouver cet emoji.`)
        else {
            emoji.delete()
            const embed = new MessageEmbed()
                .setTitle('Emoji delete')
                .setColor(client.config.color.VERT)
                .setThumbnail(`https://cdn.discordapp.com/emojis/${emoji.id}${emoji.animated ? '.gif' : '.png'}`)
                .addField(`Action :`, `Delete`, true)
                .addField(`Nom :`, `${emoji.name}`, true)
                .setTimestamp()
                .setFooter(`BOT ID : ${client.user.id}`)
            message.channel.send(embed)
        }
    } else {
        const emoteID = await args[0].trim().replace('<:', '').replace('<a:', '').replace('>', '').split(':')[1];
        if (!emoteID) return message.channel.send(`${client.config.emojis.error}Je n'ai pas trouver cet emoji.`);
        const emoteURL = `https://cdn.discordapp.com/emojis/${emoteID}${args[0].startsWith('<a:') ? '.gif' : '.png'}`;
        const embed = new MessageEmbed()
            .setTitle('Emoji view')
            .setColor(`${client.config.color.EMBEDCOLOR}`)
            .setImage(emoteURL)
            .setTimestamp()
            .setFooter('BOT ID : 689210215488684044')
        message.channel.send(embed)
    }
}
module.exports.help = {
    name: 'emojis',
    aliases: ['emojis', 'emoji', 'emots'],
    category: 'administration',
    description: 'Permet de gérer les emojis.',
    cooldown: 5,
    usage: '<action> <args>',
    exemple: ["emoji create lien Spiritus "],
    permissions: false,
    isUserAdmin: false,
    args: false,
    sousCommdandes: ["emojis liste", "emojis create", "emoji delete"]
}
