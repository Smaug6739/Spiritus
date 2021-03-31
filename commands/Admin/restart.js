module.exports.run = async (client, message, args) => {
    if (!client.config.ADMIN.includes(message.author.id)) return message.channel.sendErrorMessage(`Tu n'est pas admin du BOT `)
    console.log("Redemarage")
    await message.channel.sendSuccessMessage(`OK .`)
    process.exit()

}
module.exports.help = {

    name: 'restart',
    aliases: ['restart'],
    category: 'admin',
    description: 'Redemare le bot.',
    cooldown: 5,
    usage: '',
    exemple: [],
    moderator: true,
    isUserAdmin: false,
    args: false,
    subcommands: [""]

}
