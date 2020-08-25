const {MessageEmbed} = require('discord.js')
module.exports.run = async (client, message, args, settings, dbUser) => {
    if(args[0] === 'rem'){
        const title = args[1]
        let objet = settings.shop.find(e => e.name == title)
                if(objet){
                    client.updateUser(message.member, {$pull:{ objets: {name: title} }});
                    message.channel.send(`${client.config.emojis.success} J'ai bien supprimer cet objet.`)
                } 
                else return message.channel.send(`${client.config.emojis.error} Je n'ai pas trouver cet objet.`)
    }else{
        if (message.mentions.users.first()) {
            const user = message.guild.member(message.mentions.users.first());
            const mentionUser = await client.getUser(user, message.member.guild.id)
            if (mentionUser == undefined) return message.channel.send(`${user.user.username} pocède **0** ${client.config.emojis.coins} et ne pocède pas d'objets.`)
            else{
                const embed = new MessageEmbed()
                embed.setTitle(`Inventaire de **${user.user.username}**`)
                embed.setColor(client.config.color.EMBEDCOLOR)
                if (message.guild.iconURL()) embed.setThumbnail(`${message.guild.iconURL()}`)
                embed.addField(`\u200b`,`**${user.user.tag}** pocède ${mentionUser.coins} ${client.config.emojis.coins} .`,false)
                if(mentionUser.objets){
                    embed.addField("Objets pocédés : ",`\u200b`,false)
                    mentionUser.objets.slice(0, 15).forEach(objet => {
                        embed.addField(`\u200b`,`${client.config.emojis.fleche} ${objet.name}\n__Valeur :__ ${objet.price} ${client.config.emojis.coins}\n__Description :__ ${objet.description}`,false)
                    });
                    embed.addField(`\u200b`,`Vous pouvez supprimer des objets de votre inventaire avec la commande \`inventaire rem\``,false)
                }
                embed.setTimestamp()
                embed.setFooter(`Shop de ${user.user.tag} (${user.user.id})`)
                message.channel.send(embed)
            }
        }else{
            if(!dbUser && settings.expsysteme) return message.channel.send(`Vous avez **0** ${client.config.emojis.coins} et vous ne possédez pas d'objets ${message.author} !`)
            if(!dbUser) {
                    await client.createUser({
                    guildID: message.member.guild.id,
                    guildName: message.member.guild.name,
                    userID: message.member.id,
                    username: message.member.user.tag,
                    coins : 0,
                    daily : Date.now(),
                })
              message.channel.send(`Vous avez **0** ${client.config.emojis.coins} et vous ne possédez pas d'objets ${message.author} !`)
            } else {
                if(!dbUser.coins) client.updateUser(message.member, {coins : 0})
                const embed = new MessageEmbed()
                    embed.setTitle(`Inventaire de **${message.member.user.username}**`)
                    embed.setColor(client.config.color.EMBEDCOLOR)
                    if (message.guild.iconURL()) embed.setThumbnail(`${message.guild.iconURL()}`)
                    embed.addField(`\u200b`,`**${message.member.user.tag}** pocède ${dbUser.coins} ${client.config.emojis.coins} .`,false)
                    if(dbUser.objets){
                        embed.addField("Objets pocédés : ",`\u200b`,false)
                        dbUser.objets.slice(0, 15).forEach(objet => {
                            embed.addField(`\u200b`,`${client.config.emojis.fleche} ${objet.name}\n__Valeur :__ ${objet.price} ${client.config.emojis.coins}\n__Description :__ ${objet.description}`,false)
                        });
                        embed.addField(`\u200b`,`Vous pouvez supprimer des objets de votre inventaire avec la commande \`inventaire rem\``,false)
                    }
                    embed.setTimestamp()
                    embed.setFooter(`Shop de ${message.member.user.tag} (${message.member.user.id})`)
                    message.channel.send(embed)
            }  
        }  
    }
    
}
module.exports.help = {
    name: 'inventaire',
    aliases: ['inventaire','money'],
    category: 'economie',
    description: 'Affiche votre inventaire d\'objets et pièces.',
    cooldown: 10,
    usage: '',
    exemple: [''],
    isUserAdmin: false,
    permissions: false,
    args: false,
    sousCommdandes: []
}
