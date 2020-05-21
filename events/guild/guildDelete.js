module.exports = async (client, guild) => {
    console.log(`Quiter le serveur ${guild.name}`)
    await client.deleteGuild(guild)
};