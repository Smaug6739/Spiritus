const { ShardingManager } = require('discord.js');
const CONFIG = require('./configuration')
const manager = new ShardingManager('./main.js', { token: `${CONFIG.TOKENS.DISCORD}` });

manager.spawn();
manager.on('shardCreate', shard => {
    console.log(`Launched shard ${shard.id}`)
});
