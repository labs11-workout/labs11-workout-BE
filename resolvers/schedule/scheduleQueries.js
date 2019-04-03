const getSchedules = async (root, args, context, info) =>
	context.prisma.schedules({
		where: {
			user: {
				authId: context.userID
			}
		}
	});

const getSchedule = async(root, args, context, info) => context.prisma.schedule({
	id: args.id
});

module.exports = {
	getSchedules,
	getSchedule
};
