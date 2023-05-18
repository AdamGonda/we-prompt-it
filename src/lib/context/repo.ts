import { PrismaClient } from '@prisma/client';
import { getDBUser } from './user';
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
			isForked: false,
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

export async function getRepoById(id) {
	return await prisma.repo.findFirst({
		where: { id, isDeleted: false },
		include: {
			author: true,
			stars: { where: { isDeleted: false } },
			prompt: {
				include: {
					aiModel: true
				}
			},
			changeRequests: true
		}
	});
}

export async function getAllRepos() {
	return await prisma.repo.findMany({
		where: { isDeleted: false },
		include: { stars: { where: { isDeleted: false } } }
	});
}

export async function updateRepo(id, data) {
	const repo = await prisma.repo.findUnique({
		where: { id },
		include: { prompt: true }
	});

	if (!repo) {
		throw new Error(`No repo found with id: ${id}`);
	}

	await prisma.repo.update({
		where: { id },
		data: {
			name: data.name,
			description: data.description
		}
	});

	await prisma.prompt.update({
		where: { id: repo.prompt.id },
		data: { content: data.content, aIModelId: data.model }
	});
}
