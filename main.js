const { Client, Collection, WebhookClient, TextChannel, CommandInteraction } = require('discord.js');
const { loadCommands, loadEvents } = require("./util/loader");
const client = new Client({
  disableMentions: 'everyone',
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_EMOJIS', 'GUILD_MESSAGE_REACTIONS'],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
require('./util/functions')(client);
require('./util/Utils')(client);
client.mongoose = require("./util/mongoose");
["commands", "cooldowns"].forEach(x => client[x] = new Collection());
loadCommands(client);
loadEvents(client);
client.mongoose.init();
client.config = require("./config")
client.configuration = require('./configuration')
client.login(client.configuration.TOKENS.DISCORD);

TextChannel.prototype.sendSuccessMessage = function (content, file) {
  return this.send(`${client.config.emojis.success} ${content}`, file);
};
TextChannel.prototype.sendErrorMessage = function (content, file) {
  return this.send(`${client.config.emojis.error} ${content}`, file);
};
CommandInteraction.prototype.replySuccessMessage = function (content, file) {
  return this.reply(`${client.config.emojis.success} ${content}`, file);
};
CommandInteraction.prototype.replyErrorMessage = function (content, file) {
  return this.reply(`${client.config.emojis.error} ${content}`, file);
};
client.getArg = (array, name) => {
  let pos = undefined;
  array.map(function (e) {
    if (e[name]) pos = e[name];
  })
  return pos
}
process.on('uncaughtException', (error) => {
  console.warn(error);
  if (!client) return;
  client.errorHook.send(error, { code: 'js' });
});
process.on('unhandledRejection', (listener) => {
  console.warn(listener);
  if (!client) return;
  client.errorHook.send(listener, { code: 'js' });
});
process.on('rejectionHandled', (listener) => {
  console.warn(listener);
  if (!client) return;
  client.errorHook.send(listener, { code: 'js' });
});
process.on('warning', (warning) => {
  console.warn(warning);
  if (!client) return;
  client.errorHook.send(warning, { code: 'js' });
});
client.errorHook = new WebhookClient(`${client.configuration.WEBHOOKS.CONSOLE.ID}`, `${client.configuration.WEBHOOKS.CONSOLE.TOKEN}`);

// client.commands.filter(cmd => cmd.help.category === 'administration')
//   .map(cmd => `|${cmd.help.name}|${cmd.help.description}|${cmd.help.subcommands.map(sub => sub.name).join(', ')}|${cmd.help.cooldown}secs|`)