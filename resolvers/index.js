const userQueries = require("./user/userQueries");
const scheduleQueries = require("./schedule/scheduleQueries");
const scheduleMutations = require("./schedule/scheduleMutations");
const workoutQueries = require("./workout/workoutQueries");
const workoutMutations = require("./workout/workoutMutations");
const exerciseQueries = require("./exercise/exerciseQueries");
const exerciseMutations = require("./exercise/exerciseMutations");
const bodyMeasurementQueries = require('./bodyMeasurement/bodyMeasurementQueries');
const bodyMeasurementMutations = require('./bodyMeasurement/bodyMeasurementMutations');
const bodyMetricsQueries = require('./bodyMetrics/bodyMetricsQueries');
const bodyMetricsMutations = require('./bodyMetrics/bodyMetricsMutations');

const typeResolvers = require("./typeResolvers");

const resolvers = {
	Query: {
		info: () => `This is the API of CleanLift`,
		...userQueries,
		...scheduleQueries,
		...workoutQueries,
		...exerciseQueries,
		...bodyMeasurementQueries,
		...bodyMetricsQueries,
	},
	Mutation: {
		...scheduleMutations,
		...workoutMutations,
		...exerciseMutations,
		...bodyMeasurementMutations,
		...bodyMetricsMutations
	},
	...typeResolvers
};

module.exports = resolvers;
