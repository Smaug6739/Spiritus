const mongoose = require("mongoose");
const { Guild,User,Cmd } = require("../models/index");

module.exports = client => {
  
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
  //const { DEFAULTSETTINGS: defaultSettings} = require(`../config.js`);
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

client.getUser = async (user, guild) => {
  const data = await User.findOne({ userID: user.id, guildID: guild });
  
  if (data) return data;
  else return;
};
client.getUsers = async guild => {
  const data = await User.find({guildID : guild.id});
  
  if (data) return data;
  else return;
};

client.updateUser = async (user, settings) => {
  let data = await client.getUser(user, user.guild.id);
  if (typeof data !== "object") data = {};
  for (const key in settings) {
    if (data[key] !== settings[key]) data[key] = settings[key];
  }
  return data.updateOne(settings);
};
client.addExp = async (client, member, exp)=>{
  const userToUpdate = await client.getUser(member, member.guild.id);
  const updateExp = userToUpdate.experience + exp;
  await client.updateUser(member, {experience : updateExp});
}
client.removeExp = async (client, member, exp)=>{
  const userToUpdate = await client.getUser(member, member.guild.id);
  const updateExp = userToUpdate.experience - exp;
  await client.updateUser(member, {experience : updateExp});
}


//-----------------------------CMD--------------------------------------------
client.createCmd = async cmd => {
  const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, cmd);
  const createCmd = await new Cmd(merged);
  createCmd.save().then(u => console.log(`Nouvel commande -> ${u.nom}`));
};
client.getCmd = async (cmdNom, guild) => {
  const data = await Cmd.findOne({ nom: cmdNom, guildID: guild.id });
  if (data) return data;
  else return ;
};
client.getCmds = async guild => {
  const data = await Cmd.find({guildID : guild.id});
  if (data) return data;
  else return;
};
client.updateCmd = async (cmdNom,guild, settings) => {
  let data = await client.getCmd(cmdNom, guild);
  if (typeof data !== "object") data = {};
  for (const key in settings) {
    if (data[key] !== settings[key]) data[key] = settings[key];
  }
  if(data.nom){
    console.log(data)
  return data.updateOne(settings);
  }
}
client.deleteCmd = async (cmdNom, guild) => {
  const data = await Cmd.findOne({ nom: cmdNom, guildID: guild.id });
  if(data){
    await data.delete()
  }
};
};