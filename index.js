require("dotenv").config();
const bodyParser = require('body-parser')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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
		return { prisma, userID: req.request.user.sub }; //In all of our resolvers, the unique userID will be context.userID
	}
});

server.use("/", checkJwt, errorResponse);
server.post('/payment', bodyParser.json(), checkJwt, async (req, res) => {
	try{
		console.log(req.body);
		//console.log(req.request.body);
		const token = req.body.stripeToken
	const charge = await stripe.charges.create({
		amount: 999,
		currency: 'usd',
		description: 'Clean Lift Premium Subsription',
		source: token,
		capture: true,
	  });
	  await prisma.updateUser({where: {
		  authId: req.user.sub
	  }, 
	  data: {
		  premium: true
	  }})
	  res.json("Payment Suceeded");
	}
	catch(err){
		console.log(err);
	}
	//unique authID:
	//req.user.sub
});

const port = process.env.PORT || 4000;

server.start(({ port }) => {
	console.log(`Server is running on port ${port}`);
});
