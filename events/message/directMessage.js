const { MessageEmbed } = require("discord.js");

module.exports = (client, message) => {
  const user = message.author;
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

/*
const { MessageEmbed, ReactionCollector } = require("discord.js");

module.exports = async (client, message, guild) => {
  let channel = guild.channels.find((c) => c.name === "logs-mod-mail");
  let embed = new MessageEmbed();
  embed.setTitle("Message de: " + user.tag);
  embed.addField("Guild", `${guild.name}`);
  embed.setDescription(`Message: ${message.content}`);
  if (message.content === "*help") return;
  let msg = await channel.send(embed);

  await msg.react("✅");
  await msg.react("❎");

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
};*/
