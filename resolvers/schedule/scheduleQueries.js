const getSchedules = async (root, args, context, info) =>
	context.prisma.schedules({
		where: {
			user: {
				authId: context.userID
			}
		}
	});

module.exports = {
	getSchedules
};
