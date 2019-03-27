const userQueries = require("./userQueries");
const scheduleQueries = require("./scheduleQueries");
const scheduleMutations = require("./scheduleMutations");
const workoutMutations = require('./workoutMutations');
const workoutQueries = require('./workoutQueries');

const typeResolvers = require("./typeResolvers");

const resolvers = {
	Query: {
		info: () => `This is the API of CleanLift`,
		...userQueries,
		...scheduleQueries,
		...workoutQueries
	},
	Mutation: {
		...scheduleMutations,
		...workoutMutations
	},
	...typeResolvers
};

module.exports = resolvers;
