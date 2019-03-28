const getBodyMeasurements = async (root, args, context, info) =>
	context.prisma.bodyMeasurements({
		where: {
			user: {
				authId: context.userID
			}
		}
	});

module.exports = {
	getBodyMeasurements
};
