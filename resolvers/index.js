const userQueries = require("./user/userQueries");
const scheduleQueries = require("./schedule/scheduleQueries");
const scheduleMutations = require("./schedule/scheduleMutations");
const workoutMutations = require('./workout/workoutMutations');
const workoutQueries = require('./workout/workoutQueries');
const bodyMeasurementQueries = require('./bodyMeasurement/bodyMeasurementQueries');
const bodyMeasurementMutations = require('./bodyMeasurement/bodyMeasurementMutations');

const typeResolvers = require("./typeResolvers");

const resolvers = {
	Query: {
		info: () => `This is the API of CleanLift`,
		...userQueries,
		...scheduleQueries,
		...workoutQueries,
		...bodyMeasurementQueries
	},
	Mutation: {
		...scheduleMutations,
		...workoutMutations,
		...bodyMeasurementMutations
	},
	...typeResolvers
};

module.exports = resolvers;
