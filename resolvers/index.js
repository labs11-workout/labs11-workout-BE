const userQueries = require("./user/userQueries");
const scheduleQueries = require("./schedule/scheduleQueries");
const scheduleMutations = require("./schedule/scheduleMutations");
const workoutQueries = require("./workout/workoutQueries");
const workoutMutations = require("./workout/workoutMutations");
const exerciseQueries = require("./exercise/exerciseQueries");
const exerciseMutations = require("./exercise/exerciseMutations");

const typeResolvers = require("./typeResolvers");

const resolvers = {
	Query: {
		info: () => `This is the API of CleanLift`,
		...userQueries,
		...scheduleQueries,
		...workoutQueries,
		...exerciseQueries
	},
	Mutation: {
		...scheduleMutations,
		...workoutMutations,
		...exerciseMutations
	},
	...typeResolvers
};

module.exports = resolvers;
