export default async (spiritus: any, interaction: any) => {
	if (!interaction.isCommand()) return;
	const settings = await spiritus.db.getGuild(interaction.guild);
	console.log(settings);

}