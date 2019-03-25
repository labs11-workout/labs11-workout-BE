const userResolvers = require("./userResolvers");
const typeResolvers = require("./typeResolvers");

const resolvers = {
	Query: {
		info: () => `This is the API of CleanLift`,
		...userResolvers
	},
	// Mutation: {}, Uncomment and add mutation resolvers inside.
	...typeResolvers
};

module.exports = resolvers;
