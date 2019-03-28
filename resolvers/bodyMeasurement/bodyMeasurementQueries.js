const getBodyMeasurements = async (root, args, context, info) =>
	context.prisma.bodyMeasurements({
		where: {
			user: {
				id: context.userID
			}
		}
	});

module.exports = {
	getBodyMeasurements
};
