const addWorkout = async (root, args, context, info) =>
	await context.prisma.createWorkout({
		name: args.name,
		schedule: { connect: { id: args.scheduleId } }
	});

//Mutation to take a ScheduleId to add a Workout to, and a SavedWorkoutId for a SavedWorkout the new Workout will be based off of.
const addWorkoutFromSavedWorkout = async (root, args, context, info) => {
	try {
		//Get Saved Workout
		const foundSavedWorkout = await context.prisma.savedWorkout({
			id: args.savedWorkoutId
		});
		//Get the Saved Workout's Exercises.
		const foundSavedWorkoutExercises = await context.prisma
			.savedWorkout({
				id: args.savedWorkoutId
			})
			.exercises();
		//Create a Workout based on the foundSavedWorkout
		const newWorkout = await context.prisma.createWorkout({
			name: foundSavedWorkout.name,
			schedule: { connect: { id: args.scheduleId } }
		});
		//For every exercise in foundSavedWorkout, create a new exercise under the new workout.
		for (let i = 0; i < foundSavedWorkoutExercises.length; i++) {
			const {
				name,
				sets,
				reps,
				intervals,
				duration,
				intensity
			} = foundSavedWorkoutExercises[i];
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
				workout: { connect: { id: newWorkout.id } }
			});
		}
		return newWorkout;
	} catch (error) {
		console.log(error);
		return new Error("Sorry, there was an internal error.");
	}
};

const deleteWorkout = async (root, args, context, info) =>
	await context.prisma.deleteWorkout({ id: args.id });

const editWorkout = async (root, args, context, info) => {
	const properties = { ...args };
	//Delete the id argument from properties, as that's not a property we are updating.
	delete properties.id;
	const updatedWorkout = await context.prisma.updateWorkout({
		data: { ...properties },
		where: { id: args.id }
	});
	return updatedWorkout;
};

module.exports = {
	addWorkout,
	addWorkoutFromSavedWorkout,
	deleteWorkout,
	editWorkout
};
