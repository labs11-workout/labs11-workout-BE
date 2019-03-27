const getBodyMeasurements = async (root, args, context, info) =>
	context.prisma.bodyMeasurements({
        where: {
            user: {
                id: args.userId
            }
        }
    });

module.exports = {
    getBodyMeasurements
}