const getBodyMeasurements = async (root, args, context, info) =>
	context.prisma.bodyMeasurements();

module.exports = {
    getBodyMeasurements
}