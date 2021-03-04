module.exports = async (client, member) => {
    const dbUser = await client.getUser(member.user, member.guild.id);
    console.log(dbUser)
    if(dbUser) dbUser.delete();
}