const { Client, Collection,WebhookClient/*,Intents*/ } = require('discord.js');
const { loadCommands, loadEvents } = require("./util/loader");
//const myIntents = new Intents();
//myIntents.add('GUILDS','GUILD_MEMBERS','GUILD_MESSAGES','DIRECT_MESSAGES');
const client = new Client({// ws: { intents: myIntents }
  messageCacheMaxSize : 0,
  ws: { intents: ['GUILDS','GUILD_MEMBERS','GUILD_MESSAGES','DIRECT_MESSAGES'] },
  /*partials: ['MESSAGE', 'CHANNEL', 'REACTION']*/});
require('./util/functions')(client);
require('./util/Utils')(client);
client.mongoose = require("./util/mongoose");
["commands", "cooldowns"].forEach(x => client[x] = new Collection());
loadCommands(client);
loadEvents(client);
client.mongoose.init();
client.config = require("./config")
client.login(client.config.TOKEN);
process.on('uncaughtException', (error) => {
    console.warn(error);
    if (!client) return;
    client.errorHook.send(error, {code: 'js'});
  });
process.on('unhandledRejection', (listener) => {
  console.warn(listener);
  if (!client) return;
  client.errorHook.send(listener, {code: 'js'}); 
});
process.on('rejectionHandled', (listener) => {
  console.warn(listener);
  if (!client) return;
  client.errorHook.send(listener, {code: 'js'});
});
process.on('warning', (warning) => {
  console.warn(warning);
  if (!client) return;
  client.errorHook.send(warning, {code: 'js'});
});

  client.errorHook = new WebhookClient(
    `${client.config.webhooks.console.WEBHOOKID}`, `${client.config.webhooks.console.WEBHOOKTOKEN}`);