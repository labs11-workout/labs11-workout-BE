const userResolvers = require("./userResolvers");

const resolvers = {
	Query: {
		info: () => `This is the API of CleanLift`,
		...userResolvers
	},
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

module.exports = resolvers;
