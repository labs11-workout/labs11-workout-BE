const addSavedWorkout = async (root, args, context, info)=>
    context.prisma.createSavedWorkout({
        name: args.name,
        user: {connect: {authId: args.userId}}
    });

const editSavedWorkout = async (root, args, context, info)=>
    context.prisma.updateSavedWorkout({
        data: {name: args.name},
        where: {id: args.id}
    });

module.exports =  {
    addSavedWorkout,
    editSavedWorkout
}