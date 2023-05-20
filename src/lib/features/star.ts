import mpClient from "$lib/mp-client"

export async function addRemoveStar(userId, repoId) {
	// check if user already starred the repo before
	const starInDB = await mpClient.star.findUnique({
		where: {
			userId_repoId: { userId, repoId }
		}
	});

	// if not create new start
	if (!starInDB) {
		await mpClient.star.create({
			data: {
				userId,
				repoId
			}
		});

		return 1
	}

	// if yes based on isDeleted, reactivate or delete
	if (starInDB.isDeleted) {
		await mpClient.star.update({
			where: {
				id: starInDB.id
			},
			data: {
				isDeleted: false
			}
		});
		return 1
	} else {
		await mpClient.star.update({
			where: {
				id: starInDB.id
			},
			data: {
				isDeleted: true
			}
		});
		return -1
	}
}
