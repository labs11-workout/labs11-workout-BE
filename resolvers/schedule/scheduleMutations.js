const addSchedule = async (root, args, context, info) =>
	await context.prisma.createSchedule({
		time: args.time,
		user: {
			connect: { authId: context.userID }
		}
	});

const deleteSchedule = async (root, args, context, info) => {
	//Get all workouts under the schedule we want to delete.
	const getWorkoutsForSchedule = await context.prisma.workouts({
		where: { schedule: { id: args.id } }
	});
	//Disconnect the Schedule from the workout to not break Relations.
	for (let i = 0; i < getWorkoutsForSchedule.length; i++) {
		await context.prisma.updateWorkout({
			where: { id: getWorkoutsForSchedule[i].id },
			data: { schedule: { disconnect: true } }
		});
	}
	//Delete schedule.
	const deletedSched = await context.prisma.deleteSchedule({ id: args.id });
	//Return deleted Schedule.
	return deletedSched;
};

const editSchedule = async (root, args, context, info) =>
	await context.prisma.updateSchedule({
		data: { time: args.time },
		where: { id: args.id }
	});

module.exports = {
	addSchedule,
	deleteSchedule,
	editSchedule
};
