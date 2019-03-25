const userQueries = require("./userQueries");
const typeResolvers = require("./typeResolvers");

const resolvers = {
	Query: {
		info: () => `This is the API of CleanLift`,
		...userQueries
	},
	// Mutation: {}, Uncomment and add mutation resolvers inside.
	...typeResolvers
};

module.exports = resolvers;
