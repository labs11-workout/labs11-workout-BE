const addBodyMetric = async (root, args, context, info)=> 
  await context.prisma.createBodyMetric({
        weight: args.weight,
        height: args.height,
        bodyfat: args.bodyfat,
        user: {connect: {id: args.userId}}
    });


module.exports = {
    addBodyMetric
}
