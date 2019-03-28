const getBodyMetrics = async (root, args, context, info) =>
	context.prisma.bodyMetrics({
        where: {
            user: {
                authId: args.userId
            }
        }
    });

module.exports = {
    getBodyMetrics
}