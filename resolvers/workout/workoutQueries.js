const getWorkouts = async (root, args, context, info) => {
	if (args.scheduleId) {
		return context.prisma.workouts({
			where: {
				schedule: {
					id: args.scheduleId
				}
			}
		});
	} else {
		//if no scheduleId passed, return all workouts from every schedule to the user.
		const userSchedules = await context.prisma.schedules({
			where: {
				user: {
					authId: context.userID
				}
			}
		});
		const workouts = [];
		for (let i = 0; i < userSchedules.length; i++) {
			const scheduleWorkouts = await context.prisma.workouts({
				where: {
					schedule: {
						id: userSchedules[i].id
					}
				}
			});
			workouts.push(...scheduleWorkouts);
		}
		return workouts;
	}
};

const getWorkout = async (root, args, context, info) =>
	context.prisma.workout({ id: args.id });

module.exports = {
	getWorkouts,
	getWorkout
};
