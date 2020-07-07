const { Client, Collection,WebhookClient } = require('discord.js');
const { loadCommands, loadEvents } = require("./util/loader");
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });;
require('./util/functions')(client);
require('./util/Utils')(client);
client.mongoose = require("./util/mongoose");
["commands", "cooldowns"].forEach(x => client[x] = new Collection());
loadCommands(client);
loadEvents(client);
client.mongoose.init();
client.config = require("./config")
client.login(client.config.TOKEN);
//client.on('ready',()=> require('./test.js')(client));
process.on('uncaughtException', (error) => {
    console.warn(error);
    if (!client) return;
    client.errorHook.send(error, {code: 'js'});
  });
  process.on('unhandledRejection', (listener, test) => {
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
    `${client.config.ERREURS.WEBHOOKID}`, `${client.config.ERREURS.WEBHOOKTOKEN}`);

    /*client.on("disconnect", () => console.log("Bot is disconnecting...", "warn"))
    .on("reconnecting", () => console.log("Bot reconnecting...", "log"))
    .on("error", (e) => console.log(e, "error"))
    .on("warn", (info) => console.log(info, "warn"));*/