import { getDBUser } from '$lib/feature/user';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function forkRepo(event, data) {
	const dbUser = await getDBUser(event);

	if (!dbUser) {
		throw Error('No user found');
	}

	await prisma.repo.update({
		where: {
			id: data.id,
		},
		data: {
			noTimesForked: {
				increment: 1,
			},
		},
	});

	return await prisma.repo.create({
		data: {
			parentRepo: {
				connect: {
					id: data.id
				}
			},
			description: data.description,
			name: data.name,
			author: {
				connect: {
					id: dbUser.id
				}
			},
			prompt: {
				create: {
					content: data.content,
					aIModelId: 1
				}
			}
			// tags: {
			// 	connect: [{ id: tag1.id }]
			// },
		}
	});
}