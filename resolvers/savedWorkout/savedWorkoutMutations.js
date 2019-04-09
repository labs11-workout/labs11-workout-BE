const addSavedWorkout = async (root, args, context, info) =>
	context.prisma.createSavedWorkout({
		name: args.name,
		user: { connect: { authId: context.userID } }
	});

const addSavedWorkoutFromWorkout = async (root, args, context, info) => {
	try {
		//Find the workout and workout's exercises.
		const foundWorkout = await context.prisma.workout({ id: args.workoutId });
		const foundWorkoutExercises = await context.prisma
			.workout({ id: args.workoutId })
			.exercises();
		//Create a new SavedWorkout with the properties from the found workout.
		const newSavedWorkout = await context.prisma.createSavedWorkout({
			name: foundWorkout.name,
			user: { connect: { authId: context.userID } }
		});
		//Loop through all found workout exercises, and create them for the new saved workout.
		for (let i = 0; i < foundWorkoutExercises.length; i++) {
			const {
				name,
				sets,
				reps,
				intervals,
				duration,
				intensity
			} = foundWorkoutExercises[i];
			const newExerciseProps = {
				name,
				sets,
				reps,
				intervals,
				duration,
				intensity
			};
			const newExercise = await context.prisma.createExercise({
				...newExerciseProps,
				savedWorkout: { connect: { id: newSavedWorkout.id } }
			});
		}
		return context.prisma.savedWorkout({ id: newSavedWorkout.id });
	} catch (error) {
		console.log(error);
		return new Error("There was an internal error.");
	}
};

const deleteSavedWorkout = async (root, args, context, info) =>
	context.prisma.deleteSavedWorkout({
		id: args.id
	});

const editSavedWorkout = async (root, args, context, info) =>
	context.prisma.updateSavedWorkout({
		data: { name: args.name },
		where: { id: args.id }
	});

module.exports = {
	addSavedWorkout,
	editSavedWorkout,
	deleteSavedWorkout,
	addSavedWorkoutFromWorkout
};
