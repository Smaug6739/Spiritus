const { Guild } = require("../../models/index");
module.exports =async client => {
    console.log(`Logged in as ${client.user.tag}!`);
    let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
   /* function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }*/
   /* async function verifierguild(){
      client.guilds.cache.forEach(async guild  => {
      
        const data = await Guild.findOne({ guildID: guild.id });
        if (!data){ 
          const newGuild = {
          guildID: guild.id,
          guildName: guild.name
          
          };

          await client.createGuild(newGuild)
        }
        console.log(guild.id)
        await sleep(2000)


      })

    }
   
verifierguild() */         
     /*   const data = await Guild.findOne({ guildID: guild.id });
        if (!data){ 
          const newGuild = {
          guildID: guild.id,
          guildName: guild.name
        };
        await client.createGuild(newGuild)
      }
        console.log(guild.id)
  
    })*/
    
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