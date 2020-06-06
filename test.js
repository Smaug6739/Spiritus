client.on('message', message => {
  if(!message.content.startsWith(PREFIX) || message.author.bot) return;
  const args = message.content.slice(PREFIX.length).split(/ + /);

  const command = args.shift().toLowerCase();

// les commandes :

  if (command === 'serveur') message.channel.send(`je suis sur le serveur ${message.guild.name}.`);
  if (command === 'user') message.channel.send(`je suis l'utilisateur ${message.author.tag}.`);
  if (command === 'userinfo') {
    const user_mention = message.mentions.users.first();
      //message.channel.send(`Voici le tag de la personne mentionné: ${user_mention.tag}.`)
     console.log(user_mention);
  }
});




















