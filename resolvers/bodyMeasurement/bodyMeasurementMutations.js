const addBodyMeasurement = async(root, args, context, info)=> 
    await context.prisma.createBodyMeasurement({
        hips: args.hips,
        waist: args.waist,
        rightArm: args.rightArm,
        leftArm: args.leftArm,
        leftLeg: args.leftLeg,
        user: {connect: {id: args.userId}}
    });

const deleteBodyMeasurement = async(root, args, context, info)=>
    await context.prisma.deleteBodyMeasurement({id: args.id});

const editBodyMeasurement = async(root, args, context, info)=>
    await context.prisma.updateBodyMeasurement({
        data: {
            hips: args.hips,
            waist: args.waist,
            rightArm: args.rightArm,
            leftArm: args.leftArm,
            leftLeg: args.leftLeg,
        },
        where: {id: args.id}
    });

module.exports = {
    addBodyMeasurement,
    deleteBodyMeasurement,
    editBodyMeasurement
}