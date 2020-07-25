const mongoose = require("mongoose");
const { Guild, User } = require("../models/index");

module.exports = client => {

  client.createGuild = async guild => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createGuild = await new Guild(merged);
    await createGuild.save().then(g => console.log(`Nouveau serveur -> ${g.guildName}`));

  };
  client.deleteGuild = async guild => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) {
      await data.delete()
    }

  };
  client.getGuild = async guild => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (!data) {
      const newGuild = {
        guildID: guild.id,
        guildName: guild.name

      };

      await client.createGuild(newGuild)
    }
    if (data) return data;
    return client.configuration.DEFAULTSETTINGS;
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
    const data = await User.find({ guildID: guild.id });

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
  client.addExp = async (client, member, exp) => {
    const userToUpdate = await client.getUser(member, member.guild.id);
    const updateExp = userToUpdate.experience + exp;
    await client.updateUser(member, { experience: updateExp });
  }
  client.removeExp = async (client, member, exp) => {
    const userToUpdate = await client.getUser(member, member.guild.id);
    const updateExp = userToUpdate.experience - exp;
    await client.updateUser(member, { experience: updateExp });
  }
  /*client.addCoins = async (client, member, coins) => {
    const userToUpdate = await client.getUser(member, member.guild.id);
    const updateCoins = userToUpdate.coins + coins;
    await client.updateUser(member, { coins: updateCoins });
  }*/
};