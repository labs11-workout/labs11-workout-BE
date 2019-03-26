const addSchedule = async (root, args, context, info) =>
	await context.prisma.createSchedule({
		time: args.time,
		user: {
			connect: { authId: context.userID }
		}
	});

module.exports = {
	addSchedule
};
