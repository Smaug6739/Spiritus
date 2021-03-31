module.exports.run = (client, message) => {

    message.channel.send(`Support server is : https://discord.gg/TC7Qjfs`)

}
module.exports.help = {

    name: 'support',
    aliases: ['support'],
    category: 'bot',
    description: 'Send link to the support.',
    cooldown: 10,
    usage: '',
    exemple: [],
    isUserAdmin: false,
    permissions: false,
    args: false,
    subcommands: []
}
