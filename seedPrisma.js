const { prisma } = require("./generated/prisma-client/index");

async function seedDB() {
	for (let i = 0; i < 500; i++) {
		const newUser = await prisma.createUser({
			googleId: `${i + 1}`,
			schedules: {
				create: [
					{
						time: new Date(),
						workouts: {
							create: [
								{
									name: "Running",
									exercises: {
										create: [
											{
												name: "Sprint",
												sets: 5,
												reps: 5,
												intervals: 5,
												duration: 4,
												intensity: 5
											}
										]
									}
								}
							]
						}
					}
				]
			}
		});
	}
}

seedDB();
