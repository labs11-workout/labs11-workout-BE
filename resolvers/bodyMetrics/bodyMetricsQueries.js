const getBodyMetrics = async (root, args, context, info) =>
	context.prisma.bodyMetrics({
		where: {
			user: {
				authId: context.userID
			}
		}
	});

module.exports = {
	getBodyMetrics
};
