import type { IConfig, IEmojis, IColors, IWebhookSend } from './typescript/interfaces';
import configPrivate from './config.private';
import config from './config';
import Util from './utils/functions';
import DbFunctions from './utils/databaseFunctions';

import mongoose from 'mongoose';
import { Client, Intents, WebhookClient, MessageEmbed, CommandInteraction } from 'discord.js';
// const { CommandInteraction } = require('discord.js');
import { readdirSync } from 'fs';
import { join } from 'path';

declare module 'discord.js' {
	interface CommandInteraction {
		replySuccessMessage(content: string): any
		replyErrorMessage(content: string): any
	}
}

CommandInteraction.prototype.replySuccessMessage = function (content: string) {
	return this.reply(`${config.emojis.success} ${content}`);
};
CommandInteraction.prototype.replyErrorMessage = function (content: string) {
	return this.reply(`${config.emojis.error} ${content}`);
};

class Spiritus {
	public client: Client;
	private errorHook: WebhookClient;
	public owner: string;
	public admins: string[];
	public commands: Map<string, any>;
	public cooldowns: Map<string, any>;
	protected config: IConfig;
	private privateConfig: IConfig;
	public token: string;
	public models: any;
	public db: any;
	public util: any;
	public emojis: IEmojis;
	public colors: IColors;
	constructor() {
		this.client = new Client({
			intents: Intents.ALL,
			partials: ['CHANNEL', 'REACTION', 'USER', 'MESSAGE']
		})
		this.config = config;
		this.privateConfig = configPrivate;
		this.token = configPrivate.tokens.discord;
		this.errorHook = new WebhookClient(this.privateConfig.logs.error.id, this.privateConfig.logs.error.token);
		this.owner = config.owner.username;
		this.commands = new Map();
		this.cooldowns = new Map();
		this.util = new Util(this.client);
		this.models = { Guild: require('./models/guild').default, User: require('./models/user').default }
		this.db = new DbFunctions(this);
		this.emojis = config.emojis;
		this.colors = config.colors;
		this.admins = config.admins;
		this.loadCommands();
		this.loadEvents();
		this.handleErrors();
		this.connectDB();
		this.client.login(this.privateConfig.tokens.discord)
	}
	private async loadCommands(dir = join(__dirname, './commands')) {
		readdirSync(dir).filter(f => !f.endsWith('.js')).forEach(async dirs => {
			const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
			for (const file of commands) {
				const importFile = await import(`${dir}/${dirs}/${file}`);
				const CommandClass = importFile.default;
				const command = new CommandClass(this);
				this.commands.set(command.name, command);
				// const getFileName = await import(`../${dir}/${dirs}/${file}`);
				// this.commands.set(getFileName.help.name, getFileName);
				console.log(`Command loaded: ${command.name}`);
			};
		});
	}
	private async loadEvents(dir = join(__dirname, "./events")) {
		readdirSync(dir).forEach(async file => {
			const getFile = await import(`${dir}/${file}`).then(e => e.default)
			const evt = new getFile(this);
			const evtName = file.split(".")[0];
			this.client.on(evtName, (...args) => evt.run(...args));
			console.log(`Event loaded: ${evtName}`);
		});
	};

	private handleErrors() {
		process.on('uncaughtException', (error) => {
			console.warn(error);
			if (!this.client) return;
			this.errorHook.send({ content: "```js\n" + error.toString() + "```" });
		});
		process.on('unhandledRejection', (listener) => {
			console.warn(listener);
			if (!this.client) return;
			this.errorHook.send({ content: "```js\n" + listener!.toString() + "```" });
		});
		process.on('rejectionHandled', (listener) => {
			console.warn(listener);
			if (!this.client) return;
			this.errorHook.send({ content: "```js" + listener.toString() + "```" });
		});
		process.on('warning', (warning) => {
			console.warn(warning);
			if (!this.client) return;
			this.errorHook.send({ content: "```js" + warning.toString() + "```" });
		});
	}
	public log(type: string, options: IWebhookSend) {
		let id;
		let token;
		if (type === 'error') {
			id = this.privateConfig.logs.error.id
			token = this.privateConfig.logs.error.token
		} else {
			id = this.privateConfig.logs.info.id
			token = this.privateConfig.logs.info.token
		}
		const webhook = new WebhookClient(id, token);
		webhook.send(options)
	}
	private connectDB() {
		console.log(`Trying to connect on : ${this.privateConfig.mongoose.connection}`)
		mongoose.connect(this.privateConfig.mongoose.connection, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
			autoIndex: false, // Don't build indexes
			poolSize: 10, // Maintain up to 10 socket connections
			serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
			socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity  //45000
			family: 4 // Use IPv4, skip trying IPv6
		}).then(() => console.log('Mongodb is connected'))
		mongoose.connection.on("connected", () => {
			console.log("Mongoose is connected")
			const embed = new MessageEmbed()
				.setTitle('Mongoose is successfully connected.')
				.setColor('#0099ff')
				.setTimestamp()
				.setFooter(`Mongoose connection`);
			this.log('info', {
				username: 'Mongoose',
				avatar: this.privateConfig.mongoose.avatar || '',
				embeds: [embed]
			})
		});
		mongoose.connection.on('error', () => {
			console.log('Connection failed. Try reconecting in 5 seconds...');
			setTimeout(() => this.connectDB(), 5000);
		})
	}
}
const spiritus = new Spiritus();
export default spiritus;