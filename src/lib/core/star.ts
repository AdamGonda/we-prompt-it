import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function addStar(userId, repoId) {
	// check if user already starred the repo before
	const starInDB = await prisma.star.findUnique({
		where: {
			userId_repoId: { userId, repoId }
		}
	});

	// if not create new start
	if (!starInDB) {
		return await prisma.star.create({
			data: {
				userId,
				repoId
			}
		});
	}

	// if yes based on isDeleted, reactivate or delete
	if (starInDB.isDeleted) {
		return await reactivateStar(starInDB.id);
	} else {
		return await deleteStar(starInDB.id);
	}
}

export async function getStarById(id) {
	return await prisma.star.findUnique({ where: { id } });
}

export async function updateStar(id, data) {
	return await prisma.star.update({ where: { id }, data });
}

export async function deleteStar(id) {
	return await prisma.star.update({
		where: {
			id
		},
		data: {
			isDeleted: true
		}
	});
}

export async function reactivateStar(id) {
	return await prisma.star.update({
		where: {
			id
		},
		data: {
			isDeleted: false
		}
	});
}
