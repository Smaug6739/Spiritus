"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_private_1 = __importDefault(require("./config.private"));
const config_1 = __importDefault(require("./config"));
const databaseFunctions_1 = __importDefault(require("./utils/databaseFunctions"));
const functions = __importStar(require("./utils/functions"));
const mongoose_1 = __importDefault(require("mongoose"));
const discord_resolve_1 = require("discord-resolve");
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const path_1 = require("path");
discord_js_1.CommandInteraction.prototype.replySuccessMessage = function (content) {
    return this.reply(`${config_1.default.emojis.success} ${content}`);
};
discord_js_1.CommandInteraction.prototype.replyErrorMessage = function (content) {
    return this.reply(`${config_1.default.emojis.error} ${content}`);
};
class Spiritus {
    constructor() {
        this.client = new discord_js_1.Client({
            intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', discord_js_1.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, 'GUILD_MESSAGE_REACTIONS'],
            partials: ['CHANNEL', 'REACTION', 'USER', 'MESSAGE']
        });
        this.config = config_1.default;
        this.privateConfig = config_private_1.default;
        this.token = config_private_1.default.tokens.discord;
        this.errorHook = new discord_js_1.WebhookClient({ url: this.privateConfig.logs });
        this.owner = config_1.default.owner.username;
        this.commands = new Map();
        this.cooldowns = new Map();
        this.util = new discord_resolve_1.DiscordResolve(this.client);
        this.functions = functions;
        this.models = { Guild: require('./models/guild').default, User: require('./models/user').default };
        this.db = new databaseFunctions_1.default(this);
        this.emojis = config_1.default.emojis;
        this.colors = config_1.default.colors;
        this.admins = config_1.default.admins;
        this.loadCommands();
        this.loadEvents();
        this.handleErrors();
        this.connectDB();
        this.client.login(this.privateConfig.tokens.discord);
    }
    async loadCommands(dir = path_1.join(__dirname, './commands')) {
        fs_1.readdirSync(dir).filter(f => !f.endsWith('.js')).forEach(async (dirs) => {
            const commands = fs_1.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
            for (const file of commands) {
                const importFile = await Promise.resolve().then(() => __importStar(require(`${dir}/${dirs}/${file}`)));
                const CommandClass = importFile.default;
                const command = new CommandClass(this);
                this.commands.set(command.name, command);
                // const getFileName = await import(`../${dir}/${dirs}/${file}`);
                // this.commands.set(getFileName.help.name, getFileName);
                console.log(`Command loaded: ${command.name}`);
            }
            ;
        });
    }
    async loadEvents(dir = path_1.join(__dirname, "./events")) {
        fs_1.readdirSync(dir).forEach(async (file) => {
            const getFile = await Promise.resolve().then(() => __importStar(require(`${dir}/${file}`))).then(e => e.default);
            const evt = new getFile(this);
            const evtName = file.split(".")[0];
            this.client.on(evtName, (...args) => evt.run(...args));
            console.log(`Event loaded: ${evtName}`);
        });
    }
    ;
    handleErrors() {
        process.on('uncaughtException', (error) => {
            console.warn(error);
            if (!this.client)
                return;
            this.errorHook.send({ content: "```js\n" + error.toString() + "```" });
        });
        process.on('unhandledRejection', (listener) => {
            console.warn(listener);
            if (!this.client)
                return;
            this.errorHook.send({ content: "```js\n" + listener.toString() + "```" });
        });
        process.on('rejectionHandled', (listener) => {
            console.warn(listener);
            if (!this.client)
                return;
            this.errorHook.send({ content: "```js" + listener.toString() + "```" });
        });
        process.on('warning', (warning) => {
            console.warn(warning);
            if (!this.client)
                return;
            this.errorHook.send({ content: "```js" + warning.toString() + "```" });
        });
    }
    log(options) {
        const webhook = new discord_js_1.WebhookClient({ url: this.privateConfig.logs });
        webhook.send(options);
    }
    connectDB() {
        console.log(`Trying to connect on : ${this.privateConfig.mongoose.connection}`);
        mongoose_1.default.connect(this.privateConfig.mongoose.connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            autoIndex: false,
            poolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4 // Use IPv4, skip trying IPv6
        }).then(() => console.log('Mongodb is connected'));
        mongoose_1.default.connection.on("connected", () => {
            console.log("Mongoose is connected");
            const embed = new discord_js_1.MessageEmbed()
                .setTitle('Mongoose is successfully connected.')
                .setColor('#0099ff')
                .setTimestamp()
                .setFooter(`Mongoose connection`);
            this.log({
                username: 'Mongoose',
                avatar: this.privateConfig.mongoose.avatar || '',
                embeds: [embed]
            });
        });
        mongoose_1.default.connection.on('error', () => {
            console.log('Connection failed. Try reconecting in 5 seconds...');
            setTimeout(() => this.connectDB(), 5000);
        });
    }
}
const spiritus = new Spiritus();
exports.default = spiritus;
