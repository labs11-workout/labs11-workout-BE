const getBodyMeasurements = async (root, args, context, info) =>
	context.prisma.bodyMeasurements({
		where: {
			user: {
				authId: context.userID
			}
		}
	});

const getBodyMeasurement = async (root, args, context, info) =>
	context.prisma.bodyMeasurement({
		id: args.id
	});

module.exports = {
	getBodyMeasurements,
	getBodyMeasurement
};
