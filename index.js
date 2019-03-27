require("dotenv").config();

const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const resolvers = require("./resolvers");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

//This function checks to see if the token provided in Authorization header is valid according to our Auth0 service.
const checkJwt = jwt({
	// Dynamically provide a signing key
	// based on the kid in the header and
	// the signing keys provided by the JWKS endpoint.
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `${process.env.AUTH_DOMAIN}/.well-known/jwks.json`
	}),

	// Validate the audience and the issuer.
	audience: process.env.AUTH_CLIENTID,
	issuer: `${process.env.AUTH_DOMAIN}/`,
	algorithms: ["RS256"]
});

//This takes the invalidated JWT error message and makes it understandable for the end user.
const errorResponse = (err, req, res, next) => {
	console.log(err);
	if (err.name === "UnauthorizedError")
		return res
			.status(401)
			.json({ message: "Your session has expired or you are not logged in." });
	next();
};

const server = new GraphQLServer({
	typeDefs: "./schema.graphql",
	resolvers,
	context: req => {
		return { prisma,} //userID: req.request.user.sub}; //In all of our resolvers, the unique userID will be context.userID
	}
});

//server.use("/", checkJwt, errorResponse);

const port = process.env.PORT || 4000;

server.start(({ port }) => {
	console.log(`Server is running on port ${port}`);
});
