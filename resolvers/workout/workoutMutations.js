const addWorkout = async (root, args, context, info) =>
	await context.prisma.createWorkout({
		name: args.name,
		schedule: { connect: { id: args.scheduleId } }
	});

//Mutation to take a ScheduleId to add a Workout to, and a SavedWorkoutId for a SavedWorkout the new Workout will be based off of.
const addWorkoutFromSavedWorkout = async (root, args, context, info) => {
	try {
		console.log(args);
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
	//If a user marks a workout as complete or not, update the exercises inside of it to match it as well.
	if (args.completed !== null || args.completed !== undefined) {
		const updatedWorkoutExercises = await context.prisma
			.workout({ id: args.id })
			.exercises();
		//If updatedWorkout is completed, make sure every exercise inside of it is completed.
		for (let i = 0; i < updatedWorkoutExercises.length; i++) {
			let foundExercise = updatedWorkoutExercises[i];
			if (foundExercise.completed !== args.completed) {
				const updatedExercise = await context.prisma.updateExercise({
					data: { completed: args.completed },
					where: { id: foundExercise.id }
				});
			}
		}
	}
	//Return the workout with the exercises in it that are now updated.
	return context.prisma.workout({ id: args.id });
};

module.exports = {
	addWorkout,
	addWorkoutFromSavedWorkout,
	deleteWorkout,
	editWorkout
};
