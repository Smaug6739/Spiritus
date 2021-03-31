module.exports.run = async (client, message, args, settings, dbUser) => {
    if (!dbUser) return message.channel.sendErrorMessage(`You don't have enough coins for this. You can have coins with the command \`daily\` `)
    if (!dbUser.coins) return message.channel.sendErrorMessage(`You don't have enough coins for this. You can have coins with the command \`daily\` `)
    const user = await client.resolveMember(message.guild, args[0]);
    if (!user) return message.channel.sendErrorMessage('User not found.')
    const mentionUser = await client.getUser(user, message.member.guild.id);
    const moneyToAdd = parseInt(`${args[1]}`)
    if (user === message.member) return message.channel.sendErrorMessage(`You can't give coins to you.`)
    if (isNaN(moneyToAdd) == true) return message.channel.sendErrorMessage(`Please provide number in second argument.`);
    if (mentionUser == undefined) {
        if (dbUser.coins < moneyToAdd) return message.channel.sendErrorMessage(`You don't have enough coins for this. You can have coins with the command \`daily\` `)
        else {
            await client.createUser({
                guildID: user.guild.id,
                guildName: user.guild.name,
                userID: user.id,
                username: user.user.tag,
                coins: moneyToAdd,
                daily: Date.now(),
            })
            await client.remCoins(client, message.member, moneyToAdd)
            message.channel.sendSuccessMessage(`You have give **${moneyToAdd}** ${client.config.emojis.coins} to ${user.user.username}`)
        }

    } else {
        if (dbUser.coins < moneyToAdd) return message.channel.sendErrorMessage(`You don't have enough coins for this. You can have coins with the command \`daily\` `)
        else {
            await client.addCoins(client, user, moneyToAdd)
            await client.remCoins(client, message.member, moneyToAdd)
            message.channel.sendSuccessMessage(`You have give **${moneyToAdd}** ${client.config.emojis.coins} to ${user.user.username} !`)
        }
    }

}
module.exports.help = {
    name: 'pay',
    aliases: ['pay'],
    category: 'economy',
    description: 'Give coins to a user.',
    cooldown: 10,
    usage: '<user> <money_to_give>',
    exemple: [],
    isUserAdmin: false,
    moderator: false,
    args: true,
    userPermissions: [],
    botPermissions: [],
    subcommands: []
}
