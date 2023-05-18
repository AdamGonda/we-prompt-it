import { getDBUser } from '$lib/context/user';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createRepo(event, data) {
	const dbUser = await getDBUser(event);

	if (!dbUser) {
		throw Error('No user found');
	}

	return await prisma.repo.create({
		data: {
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