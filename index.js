require("dotenv").config();

const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const resolvers = require("./resolvers");

const server = new GraphQLServer({
	typeDefs: "./schema.graphql",
	resolvers,
	context: { prisma }
});

const port = process.env.PORT || 4000;

server.start(({ port }) => {
	console.log(`Server is running on port ${port}`);
});
