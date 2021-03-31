module.exports.run = async (client, message) => {

    let debut = Date.now();
    message.channel.send('Pong !').then(async (m) => await m.edit(`Pong  BOT : \`${Date.now() - debut}ms\` API : \`${client.ws.ping}ms\``));

}
module.exports.help = {

    name: 'ping',
    aliases: ['ping'],
    category: 'bot',
    description: 'Ping the bot.',
    cooldown: 3,
    usage: '',
    exemple: ['ping'],
    moderator: false,
    isUserAdmin: false,
    args: false,
    userPermissions: [],
    botPermissions: [],
    subcommands: []
}