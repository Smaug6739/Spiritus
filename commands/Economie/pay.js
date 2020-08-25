module.exports.run = async (client, message, args, settings, dbUser) => {
    if(!dbUser)return message.channel.send(`${client.config.emojis.error}Vous n'avez pas asser d'argent pour faire ceci. Vous pouvez en gagner avec la commande \`daily\` `)
    if(!dbUser.coins)return message.channel.send(`${client.config.emojis.error}Vous n'avez pas asser d'argent pour faire ceci. Vous pouvez en gagner avec la commande \`daily\` `)
    if (message.mentions.users.first()) {
        const user = message.guild.member(message.mentions.users.first());
        const mentionUser = await client.getUser(user, message.member.guild.id);
        const moneyToAdd = parseInt(`${args[1]}`)
        if(user === message.member) return message.channel.send(`${client.config.emojis.error}Vous ne pouvez pas vous donner de l'argent à vous meme.`)
        if(isNaN(moneyToAdd) == true)return message.channel.send(`${client.config.emojis.error}Veuillez donner un nombre en 2eme argument.`);
        if (mentionUser == undefined){
            if(dbUser.coins < moneyToAdd) return message.channel.send(`${client.config.emojis.error}Vous n'avez pas asser d'argent pour faire ceci. Vous pouvez en gagner avec la commande \`daily\` `)
            else{
                await client.createUser({
                    guildID: user.guild.id,
                    guildName: user.guild.name,
                    userID: user.id,
                    username: user.user.tag,
                    coins : moneyToAdd,
                    daily : Date.now(),
                })
                await client.remCoins(client, message.member, moneyToAdd)
                message.channel.send(`${client.config.emojis.success}Vous venez de donner **${moneyToAdd}** ${client.config.emojis.coins} à ${user.user.username}`)
            }
            
        }else{
            if(dbUser.coins < moneyToAdd) return message.channel.send(`${client.config.emojis.error}Vous n'avez pas asser d'argent pour faire ceci. Vous pouvez en gagner avec la commande \`daily\` `)
            else{
                await client.addCoins(client, user, moneyToAdd)
                await client.remCoins(client, message.member, moneyToAdd)
                message.channel.send(`${client.config.emojis.success}Vous venez de donner **${moneyToAdd}** ${client.config.emojis.coins} à ${user.user.username} !`)
            }
        }
       
    
    }else{
        return message.channel.send(`${client.config.emojis.error}Veuillez mentionner une personne a qui donner de votre argent.`)
    }
    
}
module.exports.help = {
    name: 'pay',
    aliases: ['pay'],
    category: 'economie',
    description: 'Donne de votre argent a un membre.',
    cooldown: 10,
    usage: '<@User> <money_to_ad>',
    exemple: [''],
    isUserAdmin: false,
    permissions: false,
    args: true,
    sousCommdandes: []
}
