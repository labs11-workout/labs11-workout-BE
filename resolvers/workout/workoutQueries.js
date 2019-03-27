const getWorkouts = async (root, args, context, info) =>
	context.prisma.workouts({
        where: {
			schedule: {
				id: args.scheduleId
			}
		}
    });

module.exports = {
    getWorkouts
}