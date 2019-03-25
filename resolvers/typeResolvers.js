//This is the file for Resolvers that belong to types.

module.exports = {
	User: {
		schedules: (root, args, context, info) =>
			context.prisma.user({ id: root.id }).schedules()
	},
	Schedule: {
		workouts: (root, args, context, info) =>
			context.prisma.schedule({ id: root.id }).workouts()
	},
	Workout: {
		exercises: (root, args, context, info) =>
			context.prisma.workout({ id: root.id }).exercises()
	}
};
