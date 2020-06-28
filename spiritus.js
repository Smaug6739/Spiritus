const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./main.js', { token: 'Njg5MjEwMjE1NDg4Njg0MDQ0.XtfkIg.vuFIrI3A7wBsJSiwwBiBgZSQuI8' });

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));