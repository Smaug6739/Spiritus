module.exports = async(client, member) => {
  const settings = await client.getGuild(member.guild);
  if(settings.serveurstats){
    const logs = await member.guild.channels.cache.find(c => c.name.startsWith("All Members : "))
    if(!logs)return await member.guild.channels.create(`All Members : ${member.guild.memberCount}`, {type : "voice"}) 
    logs.setName(`All Members : ${member.guild.memberCount}`)
  }
}
