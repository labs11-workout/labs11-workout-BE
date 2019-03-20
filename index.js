const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
type Query {
  info: String!
}`;

const resolvers = {
	Query: {
		info: () => `This is the API of CleanLift`
	}
};

const server = new GraphQLServer({
	typeDefs,
	resolvers
});

const port = process.env.PORT || 4000;

server.start(({ port }) => {
	console.log(`Server is running on port ${port}`);
});
