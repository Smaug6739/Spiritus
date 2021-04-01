module.exports.run = async (client, message) => {
    if (!client.config.ADMIN.includes(message.author.id)) return message.channel.sendErrorMessage(`You are not admin of the bot.`)
    console.log("Redemarage")
    await message.channel.sendSuccessMessage(`OK .`)
    process.exit()

}
module.exports.help = {

    name: 'restart',
    aliases: ['restart'],
    category: 'admin',
    description: 'Restart the bot.',
    cooldown: 5,
    usage: '',
    exemple: [],
    moderator: false,
    isUserAdmin: false,
    args: false,
    subcommands: []

}
