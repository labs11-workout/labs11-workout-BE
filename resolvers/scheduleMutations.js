const addSchedule = async (root, args, context, info) =>
	await context.prisma.createSchedule({
		time: args.time,
		user: {
			connect: { authId: context.userID }
		}
	});

const deleteSchedule = async (root, args, context, info) =>
	await context.prisma.deleteSchedule({ id: args.id });

module.exports = {
	addSchedule,
	deleteSchedule
};
