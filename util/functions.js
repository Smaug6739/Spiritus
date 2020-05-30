const mongoose = require("mongoose");
const { Guild,User } = require("../models/index");

module.exports = async client => {
  
  client.createGuild = async guild => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createGuild = await new Guild(merged);
   await createGuild.save().then(g => console.log(`Nouveau serveur -> ${g.guildName}`));

  };
  client.deleteGuild = async guild => {
    const data = await Guild.findOne({ guildID: guild.id });
    if(data){
      await data.delete()
    }
    
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


//----------------------------USERS-----------------------------------------------

client.createUser = async user => {
  const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, user);
  const createUser = await new User(merged);
  createUser.save().then(u => console.log(`Nouvel utilisateur -> ${u.username}`));
};

client.getUser = async user => {
  const data = await User.findOne({ userID: user.id });
  if (data) return data;
  else return;
};

client.updateUser = async (user, settings) => {
  let data = await client.getUser(user);
  if (typeof data !== "object") data = {};
  for (const key in settings) {
    if (data[key] !== settings[key]) data[key] = settings[key];
  }
  return data.updateOne(settings);
};
};