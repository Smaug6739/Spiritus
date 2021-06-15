
export interface IGuildDB {
	_id: string;
	guildID: string;
	guildName: string;
	prefix: string
	logChannel: string;
	welcomeMessage: string;
	expsysteme: boolean;
	serveurstats: boolean;
	invitations: boolean;
	rankcard: string;
	salonranks: string;
	modLogs: string;
	premium: boolean;
	reactionroles: Array<any>;
	modRoles: Array<string>;
	filter: Array<string>;
	ignoreChannel: Array<string>;
	links: Array<any>;
	commandes: Array<any>;
	shop: Array<any>;
	kickauto: boolean;
}

export interface IEmojis {
	[index: string]: string
}
export interface IColors {
	[index: string]: string
}

export interface IConfig {
	[index: string]: any
}

export interface IWebhookSend {
	avatar?: string;
	username?: string;
	embeds?: Array<any>;
	content?: string;
	code?: string;
}

export interface ICommandOptions {
	name: string;
	aliases: string[];
	category: string;
	description: string;
	cooldown: number;
	userPermissions: string[];
	botPermissions: string[];
	subCommands: any[]
}

/* ------------------GUILD-FUNCTIONS------------------ */
export interface IGuildMinDB {
	id: string;
	name: string;
}

/* ------------------OTHER------------------ */
export interface IObject {
	[index: string]: any
}