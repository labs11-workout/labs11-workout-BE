const getNotes = async (root, args, context, info) => {
	//If no "subjectId" argument provided, just return all notes made by the user that aren't attached to a Workout or Schedule.
	if (!args.subjectId)
		return context.prisma.notes({
			where: {
				createdBy: { authId: context.userID },
				workout: null,
				schedule: null
			}
		});
	//Find a schedule with the provided subjectId argument. If one is found, return all the notes for that schedule ID.
	//If a schedule is not found, return all notes that are attached to a workout with an id matching the provided subjectId argument.
	const foundSchedule = await context.prisma.schedule({ id: args.subjectId });
	if (!foundSchedule) {
		const foundNotes = await context.prisma.notes({
			where: {
				workout: { id: args.subjectId }
			}
		});
		return foundNotes;
	} else {
		const foundNotes = await context.prisma.notes({
			where: {
				schedule: { id: args.subjectId }
			}
		});
		return foundNotes;
	}
};

module.exports = {
	getNotes
};
