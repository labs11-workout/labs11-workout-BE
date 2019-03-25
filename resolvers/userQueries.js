const users = async (root, args, context, info) =>
	context.prisma.users({ skip: args.skip, first: args.first });

const user = async (root, args, context, info) =>
	context.prisma.user({ googleId: args.googleId });

module.exports = {
	users,
	user
};
