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

const editSchedule = async (root, args, context, info) => {
	const properties = { ...args };
	//Delete the id argument from properties, as that's not a property we are updating.
	delete properties.id;
	const updatedSchedule = await context.prisma.updateSchedule({
		data: { ...properties },
		where: { id: args.id }
	});
	return updatedSchedule;
};

module.exports = {
	addSchedule,
	deleteSchedule,
	editSchedule
};
