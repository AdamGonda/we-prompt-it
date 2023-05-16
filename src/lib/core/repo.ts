import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createRepo(event, data, config) {
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
			name: data.name,
			isForked: !!config.isForked,
			author: {
				connect: {
					id: user.id
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

export async function searchRepos(query) {
	return await prisma.repo.findMany({
		where: {
			OR: [
				{
					name: {
						contains: query,
						mode: 'insensitive',
					}
				},
				{
					description: {
						contains: query,
						mode: 'insensitive',
					}
				},
				{
					prompt: {
						content: {
							contains: query,
							mode: 'insensitive',
						}
					}
				},
				{
					tags: {
						some: {
							name: {
								contains: query,
								mode: 'insensitive',
							}
						}
					}
				}
			],
			isDeleted: false
		},
		include: {
			tags: { where: { isDeleted: false } },
			stars: { where: { isDeleted: false } }
		}
	});
}

export async function getRepoById(id) {
	return await prisma.repo.findUnique({
		where: { id },
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

export async function deleteRepo(id) {
	return await prisma.repo.update({ where: { id }, data: { isDeleted: true } });
}
