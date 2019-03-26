const users = async (root, args, context, info) =>
	context.prisma.users({ skip: args.skip, first: args.first });

const user = (root, args, context, info) => {
	return context.prisma.user({ authId: args.authId });
};

const userLogin = async (root, args, context, info) => {
	const foundUser = await context.prisma.user({ authId: context.userID });
	if (!foundUser) {
		return context.prisma.createUser({
			authId: context.userID
		});
	} else {
		return foundUser;
	}
};

module.exports = {
	users,
	user,
	userLogin
};
