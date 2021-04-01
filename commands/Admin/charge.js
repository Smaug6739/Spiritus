const { Guild } = require("../../models/index");
module.exports.run = async (client, message, args) => {
    if (!client.config.ADMIN.includes(message.author.id)) return message.channel.sendErrorMessage(`You are not admin of the bot.`)
    //---------------------------------------CHARGE-DES-GUILDS--------------------------------------------------
    async function verifierguild() {
        client.guilds.cache.forEach(async guild => {
            const data = await Guild.findOne({ guildID: guild.id });
            if (!data) {
                const newGuild = {
                    guildID: guild.id,
                    guildName: guild.name

                };
                await client.createGuild(newGuild)
            }
            console.log(guild.id)
        })
    }
    verifierguild()
    message.channel.sendSuccessMessage(`Recharge de toutes les guilds lancée.`)
}
module.exports.help = {

    name: 'charge',
    aliases: ['charge'],
    category: 'admin',
    description: 'Reload guilds database.',
    cooldown: 5,
    usage: '',
    exemple: [],
    moderator: false,
    isUserAdmin: false,
    args: false,
    subcommands: []

}
