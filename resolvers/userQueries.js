const users = async (root, args, context, info) =>
	context.prisma.users({ skip: args.skip, first: args.first });

const user = (root, args, context, info) => {
	return context.prisma.user({ authId: args.authId });
};

module.exports = {
	users,
	user
};
