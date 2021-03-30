module.exports.run = async (client, message, args, settings, dbUser) => {
    const dailyCD = 8.64e+7
    if (!dbUser && settings.expsysteme) return message.channel.sendSuccessMessage(`Votre profil à bien été crée. Vous pouvez retapper la commande pour récolter votre argent.`)
    if (!dbUser) {
        await client.createUser({
            guildID: message.member.guild.id,
            guildName: message.member.guild.name,
            userID: message.member.id,
            username: message.member.user.tag,
            coins: 500,
            daily: Date.now(),
        })
        message.channel.sendSuccessMessage(`Vous venez de recevoir 500 coins ${message.author} !`)
    } else {

        if (!dbUser.coins) client.updateUser(message.member, { coins: 0 })
        const lastDaly = await dbUser.daily
        if (lastDaly != null && dailyCD - (Date.now() - lastDaly) > 0) {
            const cdTime = dailyCD - (Date.now() - lastDaly)
            message.channel.sendErrorMessage(`Vous ne pouvez pas taper cette commande avant **${Math.floor(cdTime / (1000 * 60 * 60) % 24)}h** et **${Math.floor(cdTime / (1000 * 60) % 60)}min** ${message.author} !`)
        } else {
            client.addCoins(client, message.member, 500)
            client.updateUser(message.member, { daily: Date.now() })
            message.channel.sendSuccessMessage(`Tu viens de gagner 500 coins !`)
        }
    }
}
module.exports.help = {
    name: 'daily',
    aliases: ['daily'],
    category: 'economie',
    description: 'Récupère son argent.',
    cooldown: 10,
    usage: '',
    exemple: [''],
    isUserAdmin: false,
    permissions: false,
    args: false,
    subcommands: []
}
