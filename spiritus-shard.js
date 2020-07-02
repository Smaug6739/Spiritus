const { ShardingManager } = require('discord.js');
const {TOKEN} = require('./config')
const manager = new ShardingManager('./main.js', { token: `${TOKEN}` });

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));