const addNote = async (root, args, context, info) => {
	//If no "subjectId" argument provided, just create a note made by the user that isn't attached to a Workout or Schedule.
	if (!args.subjectId)
		return context.prisma.createNote({
			createdBy: { connect: { authId: context.userID } },
			note: args.note
		});

	//Find a schedule with the provided subjectId argument. If one is found, create note for that schedule.
	//If a schedule is not found, create note that is attached to a workout with an id matching the provided subjectId argument.
	const foundSchedule = await context.prisma.schedule({ id: args.subjectId });
	if (!foundSchedule) {
		const foundWorkout = await context.prisma.workout({ id: args.subjectId });
		const createdNote = await context.prisma.createNote({
			createdBy: { connect: { authId: context.userID } },
			workout: { connect: { id: args.subjectId } },
			note: args.note
		});
		return createdNote;
	} else {
		const createdNote = await context.prisma.createNote({
			createdBy: { connect: { authId: context.userID } },
			schedule: { connect: { id: args.subjectId } },
			note: args.note
		});
		return createdNote;
	}
};

const editNote = async (root, args, context, info) =>
	context.prisma.updateNote({
		data: { note: args.note },
		where: { id: args.noteId }
	});

module.exports = {
	addNote,
	editNote
};
