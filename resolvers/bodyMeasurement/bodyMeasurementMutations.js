const addBodyMeasurement = async(root, args, context, info)=> 
    await context.prisma.createBodyMeasurement({
        hips: args.hips,
        waist: args.waist,
        rightArm: args.rightArm,
        leftArm: args.leftArm,
        leftLeg: args.leftLeg,
        user: {connect: {authId: context.userId}}
    });

const deleteBodyMeasurement = async(root, args, context, info)=>
    await context.prisma.deleteBodyMeasurement({id: args.id});

module.exports = {
    addBodyMeasurement,
    deleteBodyMeasurement
}