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
		data: { ...properties },
		where: { id: args.exerciseId }
	});
	//If the user passes completed boolean, check if the workout is also completed or not to update it's status.
	if (args.completed !== null || args.completed !== undefined) {
		const exercisesWorkout = await context.prisma
			.exercise({ id: args.exerciseId })
			.workout();
		const incompleteWorkoutExercises = await context.prisma
			.workout({ id: exercisesWorkout.id })
			.exercises({ where: { completed: false } });
		if (incompleteWorkoutExercises.length === 0) {
			const updateWorkout = await context.prisma.updateWorkout({
				where: { id: exercisesWorkout.id },
				data: { completed: true }
			});
		} else {
			const updateWorkout = await context.prisma.updateWorkout({
				where: { id: exercisesWorkout.id },
				data: { completed: false }
			});
		}
	}
	return updatedExercise;
};

const deleteExercise = async (root, args, context, info) =>
	context.prisma.deleteExercise({ id: args.exerciseId });

module.exports = {
	addExercise,
	editExercise,
	deleteExercise
};
