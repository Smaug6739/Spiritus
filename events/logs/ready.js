const { Guild } = require("../../models/index");
module.exports =async client => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.guilds.cache.forEach(async guild  => {
      const data = await Guild.findOne({ guildID: guild.id });
      //console.log(data)
      if (!data){ 
        const newGuild = {
        guildID: guild.id,
        guildName: guild.name
      };
      await client.createGuild(newGuild)
    }
      //console.log(guild.id)
    })
    
   /*
      if (!data){ 
      const newGuild = {
      guildID: guild.id,
      guildName: guild.name
    };
    await client.createGuild(newGuild)
  }
  */
    
  }