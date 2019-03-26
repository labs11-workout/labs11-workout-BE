//This is the file for Resolvers that belong to types.

module.exports = {
	User: {
		schedules: (root, args, context, info) =>
			context.prisma.user({ id: root.id }).schedules(),
		notes: (root, args, context, info)=>
			context.prisma.user({id: root.id}).notes(),
		savedWorkouts: (root, args, context, info)=>
			context.prisma.user({id: root.id}).savedWorkouts(),
		bodyMetrics: (root, args, context, info)=> 
			context.prisma.user({id: root.id}).bodyMetrics(),
		bodyMeasurements: (root, args, context, info)=> {
			context.prisma.user({id: root.id}).bodyMeasurements()
		}
	},
	Schedule: {
		workouts: (root, args, context, info) =>
			context.prisma.schedule({ id: root.id }).workouts()
	},
	Workout: {
		exercises: (root, args, context, info) =>
			context.prisma.workout({ id: root.id }).exercises()
	},
	SavedWorkout: {
		exercises: (root, args, context, info)=>
			context.prisma.savedWorkout({id: root.id}).exercises()
	},
	Note: {
		schedule: (root, args, context, info)=>
			context.prisma.note({id: root.id}).schedule()
	}
};
