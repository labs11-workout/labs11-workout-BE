const getSavedWorkouts = async (root, args, context, info)=>
    context.prisma.savedWorkouts({
        where: {
            user: {
                authId: args.userID
            }
        }
    });

module.exports = {
    getSavedWorkouts,
}