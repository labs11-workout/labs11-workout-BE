const addWorkout = async(root, args, context, info)=> 
    await context.prisma.createWorkout({
        name: args.name,
        schedule: {connect: {id: args.scheduleId}}
    });


const deleteWorkout = async (root, args, context, info) =>
    await context.prisma.deleteWorkout({ id: args.id });
    
const editWorkout = async(root, args, context, info)=>
    await context.prisma.updateWorkout({
        data: {name: args.name},
        where: {id: args.id}
    })

module.exports = {
    addWorkout,
    deleteWorkout,
    editWorkout
}