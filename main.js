const { Client, Collection } = require('discord.js');
const { loadCommands, loadEvents } = require("./util/loader");
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });;
require('./util/functions')(client);
client.mongoose = require("./util/mongoose");
["commands", "cooldowns"].forEach(x => client[x] = new Collection());
loadCommands(client);
loadEvents(client);
client.mongoose.init();
client.config = require("./config")
client.login(client.config.TOKEN);