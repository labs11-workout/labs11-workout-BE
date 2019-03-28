const getSavedWorkouts = async (root, args, context, info)=>
    context.prisma.savedWorkouts({
        where: {
            user: {
                authId: context.userID
            }
        }
    });

module.exports = {
    getSavedWorkouts,
}