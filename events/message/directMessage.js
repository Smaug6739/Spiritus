//const { MessageEmbed } = require("discord.js");

module.exports = (client, message) => {
  if(!message.author.bot) { // Si l'auteur du message n'est pas un bot
  let SERVERID = '710759353472516176';
  let CATEGORIEDEMANDES = '710763483955855430';
  let LOGSDEMANDES = '711248766514102332';
  let  ADMINID = '713018619805696041';
  var server = client.guilds.cache.get(SERVERID);
  var name = message.author.username+"#"+message.author.discriminator;
  var channelName = message.author.username+message.author.discriminator;
  var user = client.guilds.cache.get(SERVERID).members.cache.get(message.author.id)
  var category = server.channels.cache.get(CATEGORIEDEMANDES)
  var exists = false;
  var chanId;

  server.channels.cache.forEach(channel => { // On verifie chaque channel pour voir si il n'existe pas deja

      if(channel.name == channelName.replace(/\s/g, '-').toLowerCase()) {
          exists = true
          chanId = channel.id
      }
  })

  if(!exists) { // Si le channel n'existe pas on le crée

      server.channels.create(channelName, { type: 'text' }).then(chan => {

          if (!category) {
              console.error
          }

          chan.setParent(category.id).then(e => { // On met le nouveau channel dans la bonne catégorie
              
              chan.updateOverwrite(chan.guild.roles.everyone, { VIEW_CHANNEL: false }).then(i => { // On interdit a tout le monde de voir le channel
                  let role = chan.guild.roles.cache.get(ADMINID)
                  let date = new Date()
                  let now = ((date.getDate() < 10) ? "0"+date.getDate() : date.getDate())+"/"+((date.getMonth() < 10) ? "0"+date.getMonth() : date.getMonth())+"/"+date.getFullYear()+" à "+date.getHours()+":"+date.getMinutes()
                  chan.send("<@&"+role.id+"> Nouvelle demande de {"+message.author.id+"} ** "+name+" ** le "+now+" :\r\n"+message.content)
                  message.reply("Votre demande a bien été envoyée. Nous la traiterons dans les plus brefs délais. Merci de votre patience.")
              })
              .catch(console.error);
          })
          .catch(console.error);

      })
      .catch(console.error);

  } else { // Si le channel existe deja on envoi simplement le nouveau message

      var channel = client.channels.cache.get(chanId)
      var last;

      channel.messages.fetch()
      .then(messages => {
          server.channels.cache.get(chanId).send("**"+name+" :** "+message.content)
      })
      .catch(console.error);

  }
  
}


}
  /*const user = message.author;
  if (user.bot) return;

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`)
    .setColor("#ffa500")
    .setDescription(`**Action**: ouverture ticket\n**Raison**: ${message.content}\nUtilisateur: ${user}`)
    .setThumbnail(user.avatarURL())
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());
    
  user.send("Nous avons reçu votre ticket, on vous répondra dès que possible!");
  client.channels.cache.get('710840240570368053').send(embed);
}
*/

/*
const { MessageEmbed, ReactionCollector } = require("discord.js");

module.exports = async (client, message, guild) => {
  //let channel = guild.channels.find((c) => c.name === "logs-mod-mail");
  let channel = '711248766514102332'
  let user = message.author;
  let embed = new MessageEmbed();
  embed.setTitle("Message de: " + user.tag);
  //embed.addField("Guild", `${message.guild.name}`);
  embed.setDescription(`Message: ${message.content}`);
  if (message.content === "*help") return;
  message.channel.send(embed);

   message.react("✅");
   message.react("❎");

  let reactionFilter = (reaction, user) =>
    (reaction.emoji.name === "✅" || reaction.emoji.name === "❎") && !user.bot;

  let collector = new ReactionCollector(msg, reactionFilter, {
    max: 1,
  });
  collector.on("end", async (collected) => {
    console.log(collected);
    if (collected.first().emoji.name === "✅") {
      //console.log(guild.id);
      let newChannel = await guild.channels
        .create(`${user.id}-channel`, {
          type: "text",
          permissionOverwrites: [
            {
              id: '710759353472516176',
              deny: ["VIEW_CHANNEL"],
            },
            {
              id: "710763483955855430",
              allow: ["VIEW_CHANNEL"],
            },
          ],
        })
        .catch((err) => console.log(err));
      newChannel.send("Case created for " + user.tag);
      let msgFilter = (m) => !m.author.bot;
      let messageCollector = newChannel.createMessageCollector(msgFilter);
      messageCollector.on("collect", (m) => {
        user.send(m);
      });
      messageCollector.on("end", (collected) => {
        console.log("done");
      });
      let DMChannelCollector = user.dmChannel.createMessageCollector(msgFilter);
      DMChannelCollector.on("collect", (m) => {
        newChannel.send(m);
      });
      DMChannelCollector.on("end", (c) => console.log("done"));
    } else if (collected.first().emoji.name === "❎") {
      user.send("Request denied.");
      openedTickets.delete(user.id);
    }
  });
};
*/