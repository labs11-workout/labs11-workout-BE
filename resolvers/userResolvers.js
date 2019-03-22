const users = async (root, args, context, info) =>
	context.prisma.users({ skip: args.skip, first: args.first });

module.exports = {
	users
};
