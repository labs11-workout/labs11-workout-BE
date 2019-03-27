const getExercises = async (root, args, context, info) => {
	//See if there are exercises under a Workout with the ID specified.
	const workoutExercises = await context.prisma.exercises({
		where: {
			workout: {
				id: args.workoutId
			}
		}
	});
	//If there are no exercises with that Workout ID, check the Saved Workouts and return that instead.
	if (!workoutExercises) {
		const savedWorkoutExercises = await context.prisma.exercises({
			where: {
				savedWorkout: {
					id: args.workoutId
				}
			}
		});
		return savedWorkoutExercises;
	} else {
		return workoutExercises;
	}
};

module.exports = {
	getExercises
};
