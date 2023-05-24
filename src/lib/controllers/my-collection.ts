import { getDBUser } from '$lib/controllers/shared';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function loadMyCollection(event) {
	const dbUser = await getDBUser(event);

	const createdBy = await prisma.repo.findMany({
		where: {
			authorId: dbUser.id,
			isDeleted: false
		},
		include: {
			likes: { where: { isDeleted: false } },
			prompts: { include: { aiModel: true } },
			tags: true
		}
	});

	const forked = createdBy.filter((repo) => repo.parentId !== null);

	const like = await prisma.like.findMany({
		where: {
			userId: dbUser.id,
			isDeleted: false
		},
		include: {
			repo: {
				include: {
					prompts: { include: { aiModel: true } },
					likes: { where: { isDeleted: false } },
					tags: true
				}
			}
		}
	});

	return {
		forked,
		createdBy,
		liked: like?.map((like) => like.repo)
	};
}
