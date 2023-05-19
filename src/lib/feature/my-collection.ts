import { getDBUser } from '$lib/context/user';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getUsersCollection(event) {
	const dbUser = await getDBUser(event);

	const createdBy = await prisma.repo.findMany({
		where: {
			authorId: dbUser.id,
			isDeleted: false,
		},
		include: { stars: { where: { isDeleted: false } } }
	});

	const forked = createdBy.filter((repo) => repo.noTimesForked > 0);

	const stars = await prisma.star.findMany({
		where: {
			userId: dbUser.id,
			isDeleted: false
		},
		include: { repo: { include: { stars: { where: { isDeleted: false } } } } }
	});

	return {
		forked,
		createdBy,
		starred: stars?.map((star) => star.repo)
	};
}