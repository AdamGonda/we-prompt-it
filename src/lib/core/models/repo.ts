import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createRepo(event, data) {
	const session = event.locals.getSession();
	const userEmail = (await session).user.email;

	const user = await prisma.user.findUnique({
		where: {
			email: userEmail
		}
	});

	if (!user) {
		throw Error('No user found');
	}

	return await prisma.repo.create({
		data: {
			description: data.description,
			name: data.title,
			author: {
				connect: {
					id: user.id
				}
			},
			prompt: {
				create: {
					version: '1.0',
					content: data.content,
					aIModelId: 1
				}
			},
			// tags: {
			// 	connect: [{ id: tag1.id }]
			// },
		}
	});
}

async function getRepoById(id) {
	return await prisma.repo.findUnique({
		where: { id },
		include: {
			author: true,
			stars: true,
			prompt: {
				include: {
					aiModel: true
					
				}
			},
			changeRequests: true
		}
	});
}

async function getAllRepos() {
	return await prisma.repo.findMany({ include: { stars: true } });
}

async function updateRepo(id, data) {
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
			name: data.title,
			description: data.description
		}
	});

	await prisma.prompt.update({
		where: { id: repo.prompt.id },
		data: { content: data.content, aIModelId: data.model }
	});
}

async function deleteRepo(id) {
	return await prisma.repo.delete({ where: { id } });
}

export { createRepo, getRepoById, updateRepo, deleteRepo, getAllRepos };
