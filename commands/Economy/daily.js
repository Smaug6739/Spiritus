module.exports.run = async (client, message, args, settings, dbUser) => {
    const dailyCD = 8.64e+7
    if (!dbUser && settings.expsysteme) return message.channel.sendSuccessMessage(`Profile created. Please try again.`)
    if (!dbUser) {
        await client.createUser({
            guildID: message.member.guild.id,
            guildName: message.member.guild.name,
            userID: message.member.id,
            username: message.member.user.tag,
            coins: 500,
            daily: Date.now(),
        })
        message.channel.sendSuccessMessage(`You just received 500 coins ${message.author} !`)
    } else {

        if (!dbUser.coins) client.updateUser(message.member, { coins: 0 })
        const lastDaly = await dbUser.daily
        if (lastDaly != null && dailyCD - (Date.now() - lastDaly) > 0) {
            const cdTime = dailyCD - (Date.now() - lastDaly)
            message.channel.sendErrorMessage(`You can't use this command before **${Math.floor(cdTime / (1000 * 60 * 60) % 24)}h** and **${Math.floor(cdTime / (1000 * 60) % 60)}min** ${message.author} !`)
        } else {
            client.addCoins(client, message.member, 500)
            client.updateUser(message.member, { daily: Date.now() })
            message.channel.sendSuccessMessage(`You just received 500 coins ${message.author} !`)
        }
    }
}
module.exports.help = {
    name: 'daily',
    aliases: ['daily'],
    category: 'economy',
    description: 'Récupère give your money.',
    cooldown: 10,
    usage: '',
    exemple: [],
    isUserAdmin: false,
    permissions: false,
    args: false,
    subcommands: []
}
