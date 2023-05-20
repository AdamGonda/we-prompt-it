import mpClient from '$lib/mp-client';
import { getDBUser } from '$lib/features/user';


export async function getUsersCollection(event) {
	const dbUser = await getDBUser(event);

	const createdBy = await mpClient.repo.findMany({
		where: {
			authorId: dbUser.id,
			isDeleted: false,
		},
		include: { stars: { where: { isDeleted: false } } }
	});

	const forked = createdBy.filter((repo) => repo.parentId !== null);

	const stars = await mpClient.star.findMany({
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