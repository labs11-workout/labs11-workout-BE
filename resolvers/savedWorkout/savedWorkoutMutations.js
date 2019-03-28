const addSavedWorkout = async (root, args, context, info)=>
    context.prisma.createSavedWorkout({
        name: args.name,
        user: {connect: {authId: args.userId}}
    });

module.exports =  {
    addSavedWorkout,
}