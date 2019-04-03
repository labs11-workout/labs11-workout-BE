const getSavedWorkouts = async (root, args, context, info) =>
	context.prisma.savedWorkouts({
		where: {
			user: {
				authId: context.userID
			}
		}
	});

const getSavedWorkout = async (root, args, context, info) =>
	context.prisma.savedWorkout({ id: args.id });

module.exports = {
	getSavedWorkouts,
	getSavedWorkout
};
