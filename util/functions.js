const mongoose = require("mongoose");
const { Guild } = require("../models/index");

module.exports = async client => {
  
  client.createGuild = async guild => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createGuild = await new Guild(merged);
   await createGuild.save().then(g => console.log(`Nouveau serveur -> ${g.guildName}`));

  };
  client.deleteGuild = async guild => {
    const data = await Guild.findOne({ guildID: guild.id });

   await data.delete()
  // Guild.save()
    
  };
  
  const { DEFAULTSETTINGS: defaultSettings} = require(`../config.js`);

  client.getGuild = async guild => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (!data){ 
      const newGuild = {
      guildID: guild.id,
      guildName: guild.name
      
      };

    await client.createGuild(newGuild)
    }
    if (data) return data;
    return client.config.DEFAULTSETTINGS;
  };


  client.updateGuild = async (guild, settings) => {
    let data = await client.getGuild(guild);

    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  }
};