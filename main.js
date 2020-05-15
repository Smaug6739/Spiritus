const { Client, Collection } = require('discord.js');
const { TOKEN, PREFIX } = require('./config');
const { readdirSync } = require("fs");

const client = new Client();
["commands", "cooldowns"].forEach(x => client[x] = new Collection());

const loadCommands = (dir = "./commands/") => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

    for (const file of commands) {
      const getFileName = require(`${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.help.name, getFileName);
      console.log(`Commande chargée: ${getFileName.help.name}`);
    };
  });
};

loadCommands();

client.on('message', message => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;
  const args = message.content.slice(PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const user = message.mentions.users.first();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
  if (!command) return;

  if (command.help.permissions && !message.member.hasPermission('BAN_MEMBERS')) return message.reply("tu n'as pas les permissions pour taper cette commande!");
  
  if (command.help.args && !args.length) {
    let noArgsReply = `Il nous faut des arguments pour cette commande, ${message.author}!`;

    if (command.help.usage) noArgsReply += `\nVoici comment utiliser la commande: \`${PREFIX}${command.help.name} ${command.help.usage}\``;

    return message.channel.send(noArgsReply);
  };
  
  if (command.help.isUserAdmin && !user) return message.reply('il faut mentionner un utilisateur.');

  if (command.help.isUserAdmin && message.guild.member(user).hasPermission('BAN_MEMBERS')) return message.reply("tu ne peux pas utiliser cette commande sur cet utilisateur.");


  if (!client.cooldowns.has(command.help.name)) {
    client.cooldowns.set(command.help.name, new Collection());
  };

  const timeNow = Date.now();
  const tStamps = client.cooldowns.get(command.help.name);
  const cdAmount = (command.help.cooldown || 5) * 1000;

  if (tStamps.has(message.author.id)) {
    const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

    if (timeNow < cdExpirationTime) {
      timeLeft = (cdExpirationTime - timeNow) / 1000;
      return message.reply(`merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${command.help.name}\`.`);
    };
  };

  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount);

  command.run(client, message, args);
});

client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`));
client.login(TOKEN);