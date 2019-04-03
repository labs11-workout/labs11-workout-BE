const getBodyMetrics = async (root, args, context, info) =>
	context.prisma.bodyMetrics({
		where: {
			user: {
				authId: context.userID
			}
		}
	});

const getBodyMetric = async (root, args, context, info) =>
	context.prisma.bodyMetric({
		id: args.id
	});

module.exports = {
	getBodyMetrics,
	getBodyMetric
};
