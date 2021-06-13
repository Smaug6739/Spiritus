module.exports.run = async (client, interaction, args) => {
    const user = await client.resolveMember(interaction.guild, args.get('user').value);
    const dbUser = await client.getUser(interaction.user, interaction.guild.id);
    if (!user) return interaction.replyErrorMessage('User not found.');
    const mentionUser = await client.getUser(user, interaction.guild.id);
    const moneyToAdd = parseInt(args.get('money').value)
    if (user.id === interaction.user.id) return interaction.replyErrorMessage(`You can't give coins to you.`)
    if (isNaN(moneyToAdd) == true) return interaction.replyErrorMessage(`Please provide number in second argument.`);
    if (dbUser.coins < moneyToAdd) return interaction.replyErrorMessage(`You don't have enough coins for this. You can have coins with the command \`daily\` `)
    if (!mentionUser) {
        await client.createUser({
            guildID: user.guild.id,
            guildName: user.guild.name,
            userID: user.id,
            username: user.user.tag,
            coins: moneyToAdd,
            daily: Date.now(),
        })
        await client.remCoins(client, interaction.member, moneyToAdd)
        interaction.replySuccessMessage(`You have give **${moneyToAdd}** ${client.config.emojis.coins} to ${user.user.username}`)
    } else {
        await client.addCoins(client, user, moneyToAdd)
        await client.remCoins(client, interaction.member, moneyToAdd)
        interaction.replySuccessMessage(`You have give **${moneyToAdd}** ${client.config.emojis.coins} to ${user.user.username} !`)
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
    args: [
        {
            name: 'user',
            description: 'User to pay',
            type: 'STRING',
            required: true
        },
        {
            name: 'money',
            description: 'Monay to give.',
            type: 'STRING',
            required: true
        },
    ],
    userPermissions: [],
    botPermissions: [],
    subcommands: []
}
