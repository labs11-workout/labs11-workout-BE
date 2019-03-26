const userQueries = require("./userQueries");
const scheduleQueries = require("./scheduleQueries");
const scheduleMutations = require("./scheduleMutations");

const typeResolvers = require("./typeResolvers");

const resolvers = {
	Query: {
		info: () => `This is the API of CleanLift`,
		...userQueries,
		...scheduleQueries
	},
	Mutation: {
		...scheduleMutations
	},
	...typeResolvers
};

module.exports = resolvers;
