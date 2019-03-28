const addSavedWorkout = async (root, args, context, info)=>
    context.prisma.createSavedWorkout({
        name: args.name,
        user: {connect: {authId: context.userId}}
    });

const deleteSavedWorkout = async (root, args, context, info)=> 
    context.prisma.deleteSavedWorkout({
        id: args.id
    });

const editSavedWorkout = async (root, args, context, info)=>
    context.prisma.updateSavedWorkout({
        data: {name: args.name},
        where: {id: args.id}
    });

module.exports =  {
    addSavedWorkout,
    editSavedWorkout,
    deleteSavedWorkout
}