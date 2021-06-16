import type Spiritus from '../main';
import { ICommandOptions, ICommandInfosArgs } from '../typescript/interfaces';
export default class Command {
	protected spiritus;
	public emojis;
	public colors;
	public util;
	public db;
	protected name: string;
	protected aliases: string[];
	protected args: Array<ICommandInfosArgs>;
	protected category: string;
	protected description: string;
	protected cooldown: number;
	protected userPermissions: string[];
	protected botPermissions: string[];
	protected subCommands: string[];
	constructor(spiritus: typeof Spiritus, options: ICommandOptions) {
		this.spiritus = spiritus;
		this.emojis = this.spiritus.emojis;
		this.colors = this.spiritus.colors;
		this.util = this.spiritus.util;
		this.db = this.spiritus.db;
		this.name = options.name
		this.aliases = options.aliases
		this.args = options.args
		this.category = options.category
		this.description = options.description
		this.cooldown = options.cooldown
		this.userPermissions = options.userPermissions
		this.botPermissions = options.botPermissions
		this.subCommands = options.subCommands
	}
}