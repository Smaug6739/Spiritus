import type Spiritus from '../main';
import { ICommandOptions } from '../typescript/interfaces';
export default class Command {
	private spiritus;
	public emojis;
	public util;
	protected name: string;
	protected aliases: string[];
	protected category: string;
	protected description: string;
	protected cooldown: number;
	protected userPermissions: string[];
	protected botPermissions: string[];
	protected subCommands: string[];
	constructor(spiritus: typeof Spiritus, options: ICommandOptions) {
		this.spiritus = spiritus;
		this.emojis = this.spiritus.emojis;
		this.util = this.spiritus.util;
		this.name = options.name
		this.aliases = options.aliases
		this.category = options.category
		this.description = options.description
		this.cooldown = options.cooldown
		this.userPermissions = options.userPermissions
		this.botPermissions = options.botPermissions
		this.subCommands = options.subCommands
	}
}