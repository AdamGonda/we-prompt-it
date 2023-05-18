import { getDBUser } from '$lib/context/user';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function forkRepo(event, data) {
	const dbUser = await getDBUser(event);

	if (!dbUser) {
		throw Error('No user found');
	}

	return await prisma.repo.create({
		data: {
			parentRepo: {
				connect: {
					id: data.id
				}
			},
			description: data.description,
			name: data.name,
			isForked: true,
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