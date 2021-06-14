module.exports.run = async (client, interaction) => {

    let debut = Date.now();
    interaction.reply('Pong !')
        .then(async () => await interaction.editReply(`Pong  BOT : \`${Date.now() - debut}ms\` API : \`${client.ws.ping}ms\``));

}
module.exports.help = {

    name: 'ping',
    aliases: ['ping'],
    category: 'other',
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