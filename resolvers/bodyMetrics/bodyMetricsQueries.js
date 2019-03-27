const getBodyMetrics = async (root, args, context, info) =>
	context.prisma.bodyMetrics({
        where: {
            user: {
                id: args.userId
            }
        }
    });

module.exports = {
    getBodyMetrics
}