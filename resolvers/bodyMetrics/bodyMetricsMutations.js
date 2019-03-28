const addBodyMetric = async (root, args, context, info) =>
	await context.prisma.createBodyMetric({
		weight: args.weight,
		height: args.height,
		bodyfat: args.bodyfat,
		user: { connect: { authId: context.userID } }
	});

const deleteBodyMetric = async (root, args, context, info) =>
	await context.prisma.deleteBodyMetric({ id: args.id });

const editBodyMetric = async (root, args, context, info) =>
	await context.prisma.updateBodyMetric({
		data: {
			height: args.height,
			weight: args.weight,
			bodyfat: args.bodyfat
		},
		where: { id: args.id }
	});

module.exports = {
	addBodyMetric,
	deleteBodyMetric,
	editBodyMetric
};
