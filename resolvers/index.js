const userQueries = require("./userQueries");
const scheduleQueries = require("./scheduleQueries");

const typeResolvers = require("./typeResolvers");

const resolvers = {
	Query: {
		info: () => `This is the API of CleanLift`,
		...userQueries,
		...scheduleQueries
	},
	// Mutation: {}, Uncomment and add mutation resolvers inside.
	...typeResolvers
};

module.exports = resolvers;
