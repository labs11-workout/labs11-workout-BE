const getWorkouts = async (root, args, context, info) =>
	context.prisma.workouts();

module.exports = {
    getWorkouts
}