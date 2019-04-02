//This is the file for Resolvers that belong to types.

module.exports = {
	User: {
		schedules: (root, args, context, info) =>
			context.prisma.user({ id: root.id }).schedules(),
		notes: (root, args, context, info) =>
			context.prisma.user({ id: root.id }).notes(),
		savedWorkouts: (root, args, context, info) =>
			context.prisma.user({ id: root.id }).savedWorkouts(),
		bodyMetrics: (root, args, context, info) =>
			context.prisma.user({ id: root.id }).bodyMetrics(),
		bodyMeasurements: (root, args, context, info) => {
			context.prisma.user({ id: root.id }).bodyMeasurements();
		}
	},
	Schedule: {
		workouts: (root, args, context, info) =>
			context.prisma.schedule({ id: root.id }).workouts(),
		user: (root, args, context, info) =>
			context.prisma.schedule({ id: root.id }).user()
	},
	Workout: {
		exercises: (root, args, context, info) =>
			context.prisma.workout({ id: root.id }).exercises(),
		schedule: (root, args, context, info) =>
			context.prisma.workout({ id: root.id }).schedule()
	},
	SavedWorkout: {
		exercises: (root, args, context, info) =>
			context.prisma.savedWorkout({ id: root.id }).exercises()
	},
	Exercise: {
		workout: (root, args, context, info) =>
			context.prisma.exercise({ id: root.id }).workout(),
		savedWorkout: (root, args, context, info) =>
			context.prisma.exercise({ id: root.id }).savedWorkout()
	},
	Note: {
		schedule: (root, args, context, info) =>
			context.prisma.note({ id: root.id }).schedule(),
		workout: (root, args, context, info) =>
			context.prisma.note({ id: root.id }).workout(),
		createdBy: (root, args, context, info) =>
			context.prisma.note({ id: root.id }).createdBy()
	},
	BodyMeasurement: {
		user: (root, args, context, info) =>
			context.prisma.bodyMeasurement({ id: root.id }).user()
	},
	BodyMetric: {
		user: (root, args, context, info) =>
			context.prisma.bodyMetric({ id: root.id }).user()
	}
};
