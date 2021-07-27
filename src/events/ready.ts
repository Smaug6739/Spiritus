import type Spiritus from '../main';
export default class {
	spiritus: typeof Spiritus;
	constructor(spiritus: typeof Spiritus) {
		this.spiritus = spiritus;
	}
	run() {

		const allData = []
		const categories: string[] = [];
		for (const [_, command] of this.spiritus.commands) {
			if (command.category.toLowerCase() === 'admin') continue;
			if (!categories.includes(command.category)) categories.push(command.category);
			const options: any[] = []
			if (command.subCommands) {
				command.subCommands.forEach((sub: any) => {
					options.push({
						type: 'SUB_COMMAND',
						name: sub.name,
						description: sub.description,
						required: sub.required,
						choices: sub.choices,
						options: sub.options,
					})
				})
			}
			allData.push({
				name: command.name,
				description: command.description,
				options: options,
				defaultPermission: command.defaultPermission,
			})
		}
		this.spiritus.client.guilds.cache.get('809702809196560405')!.commands.set(allData);
		console.log(`Logged in as ${this.spiritus.client.user?.tag}!`);

	}







	//	this.spiritus.client.guilds.cache.get('809702809196560405')!.commands.set(allData);
	// --------------------ADMIN-COMMANDS-------------------- //
	// 	const allDataAdmin = []
	// 	for (const [_, command] of this.spiritus.commands) {
	// 		if (command.subCommands.length) {
	// 			const subCommands = []
	// 			for (const subc of command.subCommands) {
	// 				const optionsOfSub = [];
	// 				if (subc.args && subc.args.length) {
	// 					for (const s of subc.args) {
	// 						optionsOfSub.push({
	// 							name: s.name || 'default_name',
	// 							description: s.description || 'default description',
	// 							type: s.type || 'STRING',
	// 							required: s.required || false
	// 						})
	// 					}
	// 				}
	// 				subCommands.push({
	// 					name: subc.name,
	// 					description: subc.description,
	// 					type: 1,
	// 					options: optionsOfSub
	// 				})
	// 			}
	// 			allDataAdmin.push({
	// 				name: command.name,
	// 				type: 'SUB_COMMAND_GROUP',
	// 				description: command.description,
	// 				options: subCommands
	// 			})
	// 		}
	// 		else {
	// 			const options: any[] = [];
	// 			if (command.args && command.args.length) {
	// 				command.args.map((arg: any) => {
	// 					options.push({
	// 						name: arg.name || 'default_name',
	// 						description: arg.description || 'default description',
	// 						type: arg.type || 'STRING',
	// 						required: arg.required || false
	// 					})
	// 				})
	// 			}
	// 			allDataAdmin.push({
	// 				name: command.name,
	// 				description: command.description,
	// 				options: options
	// 			})
	// 		}
	// 	}
	// 	this.spiritus.client.guilds.cache.get('809702809196560405')!.commands.set(allDataAdmin);
	// 	console.log(`Logged in as ${this.spiritus.client.user?.tag}!`);
	// }
}

/*
if (command.subCommands.length) {
				const subCommands = []
				for (const subc of command.subCommands) {
					const optionsOfSub = [];
					if (subc.args && subc.args.length) {
						for (const s of subc.args) {
							optionsOfSub.push({
								name: s.name || 'default_name',
								description: s.description || 'default description',
								type: s.type || 'STRING',
								required: s.required || false
							})
						}
					}
					subCommands.push({
						name: subc.name,
						description: subc.description,
						type: 1,
						options: optionsOfSub
					})
				}
				allData.push({
					name: command.name,
					type: 'SUB_COMMAND_GROUP',
					description: command.description,
					options: subCommands
				})
			}
			*/