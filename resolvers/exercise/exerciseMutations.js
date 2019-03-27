const addExercise = async (root, args, context, info) => {
	//See if the workout with the ID provided exists.
	const foundWorkout = await context.prisma.workout({ id: args.workoutId });
	//If there are no exercises with that Workout ID, check the Saved Workouts and create the exercise under that instead.
	if (!foundWorkout) {
		const foundSavedWorkout = await context.prisma.savedWorkout({
			id: args.workoutId
		});
		const properties = { ...args };
		//Delete the workoutId argument from properties, as that's not a property exercises have.
		delete properties.workoutId;
		const createdExercise = await context.prisma.createExercise({
			...properties,
			savedWorkout: { connect: { id: args.workoutId } }
		});
		return createdExercise;
	} else {
		//Since there was a normal workout found, create the Exercise under that.
		const properties = { ...args };
		//Delete the workoutId argument from properties, as that's not a property exercises have.
		delete properties.workoutId;
		const createdExercise = await context.prisma.createExercise({
			...properties,
			workout: { connect: { id: args.workoutId } }
		});
		return createdExercise;
	}
};

const editExercise = async (root, args, context, info) => {
	const properties = { ...args };
	//Delete the exerciseId argument from properties, as that's not a property we are updating.
	delete properties.exerciseId;
	const updatedExercise = await context.prisma.updateExercise({
		data: { ...args },
		where: { id: args.exerciseId }
	});
	return updatedExercise;
};

module.exports = {
	addExercise,
	editExercise
};
