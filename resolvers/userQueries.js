const users = async (root, args, context, info) =>
	context.prisma.users({ skip: args.skip, first: args.first });

const user = (root, args, context, info) => {
	return context.prisma.user({ googleId: args.googleId });
};

module.exports = {
	users,
	user
};
