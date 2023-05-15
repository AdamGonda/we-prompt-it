import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createStar(userId, repoId) {
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

async function getStarById(id) {
	return await prisma.star.findUnique({ where: { id } });
}

async function updateStar(id, data) {
	return await prisma.star.update({ where: { id }, data });
}

async function deleteStar(id) {
	return await prisma.star.update({
		where: {
			id
		},
		data: {
			isDeleted: true
		}
	});
}

async function reactivateStar(id) {
	return await prisma.star.update({
		where: {
			id
		},
		data: {
			isDeleted: false
		}
	});
}

export { createStar, getStarById, updateStar, deleteStar };
