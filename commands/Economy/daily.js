module.exports.run = async (client, interaction) => {
    const dbUser = await client.getUser(interaction.user, interaction.guild.id);
    const dailyCD = 8.64e+7
    if (!dbUser) {
        await client.createUser({
            guildID: interaction.member.guild.id,
            guildName: interaction.member.guild.name,
            userID: interaction.member.id,
            username: interaction.member.user.tag,
            coins: 500,
            daily: Date.now(),
        })
        interaction.replySuccessMessage(`You just received 500 coins ${interaction.author} !`)
    } else {
        if (!dbUser.coins) client.updateUser(interaction.member, { coins: 0 })
        const lastDaly = await dbUser.daily
        if (lastDaly != null && dailyCD - (Date.now() - lastDaly) > 0) {
            const cdTime = dailyCD - (Date.now() - lastDaly)
            interaction.replyErrorMessage(`You can't use this command before **${Math.floor(cdTime / (1000 * 60 * 60) % 24)}h** and **${Math.floor(cdTime / (1000 * 60) % 60)}min** ${interaction.user} !`)
        } else {
            client.addCoins(client, interaction.member, 500)
            client.updateUser(interaction.member, { daily: Date.now() })
            interaction.replySuccessMessage(`You just received 500 coins ${interaction.author} !`)
        }
    }
}
module.exports.help = {
    name: 'daily',
    aliases: ['daily'],
    category: 'economy',
    description: 'Give your money every day.',
    cooldown: 10,
    usage: '',
    exemple: [],
    isUserAdmin: false,
    moderator: false,
    args: null,
    userPermissions: [],
    botPermissions: [],
    subcommands: []
}
