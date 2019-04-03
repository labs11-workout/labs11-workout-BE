const getWorkouts = async (root, args, context, info) =>
	context.prisma.workouts({
		where: {
			schedule: {
				id: args.scheduleId
			}
		}
	});

const getWorkout = async (root, args, context, info) =>
	context.prisma.workout({ id: args.id });

module.exports = {
	getWorkouts,
	getWorkout
};
