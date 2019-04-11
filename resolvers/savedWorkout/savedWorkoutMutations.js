const addSavedWorkout = async (root, args, context, info) => {
	try {
		//Check if user is premium, if not, make sure they don't have more than 3 already.
		const creatingUser = await context.prisma.user({ authId: context.userID });
		if (!creatingUser.premium) {
			const creatingUsersSavedWorkouts = await context.prisma.savedWorkouts({
				where: { user: { authId: context.userID } }
			});
			if (creatingUsersSavedWorkouts.length >= 3)
				return new Error(
					"You must buy premium to have 3 or more Workout Templates."
				);
		}
		return context.prisma.createSavedWorkout({
			name: args.name,
			user: { connect: { authId: context.userID } }
		});
	} catch (error) {
		return new Error(error);
	}
};

const addSavedWorkoutFromWorkout = async (root, args, context, info) => {
	try {
		//Check if user is premium, if not, make sure they don't have more than 3 already.
		const creatingUser = await context.prisma.user({ authId: context.userID });
		if (!creatingUser.premium) {
			const creatingUsersSavedWorkouts = await context.prisma.savedWorkouts({
				where: { user: { authId: context.userID } }
			});
			if (creatingUsersSavedWorkouts.length >= 3)
				return new Error(
					"You must buy premium to have 3 or more Workout Templates."
				);
		}
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
