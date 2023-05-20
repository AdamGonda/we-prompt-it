import { getDBUser } from '$lib/features/user';
import { getAllAIModels, getAllTags, getRepoById } from '$lib/features/shared';
import { error } from '@sveltejs/kit';
import { PrismaClient } from "@prisma/client";
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

export async function createRepo(event, data) {
	const dbUser = await getDBUser(event);

	if (!dbUser) {
		throw Error('No user found');
	}

	return await prisma.repo.create({
		data: {
			id: nanoid(),
			description: data.description,
			name: data.name,
			author: {
				connect: {
					id: dbUser.id
				}
			},
			prompts: {
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

export async function editRepo(event, formData) {
	const id = event.params.id;
	const user = await getDBUser(event);

	const repo = await prisma.repo.findUnique({
		where: { id },
		include: { prompts: true }
	});

	if (!repo) {
		throw new Error(`No repo found with id: ${id}`);
	}

	if (repo.isDeleted) {
		throw new Error(`Repo with id ${id} is deleted`);
	}

	if (repo.authorId !== user.id) {
		throw new Error(`User ${user.id} is not the author of repo ${id}`);
	}

	await prisma.repo.update({
		where: { id },
		data: {
			name: formData.name,
			description: formData.description
		}
	});

	await prisma.prompt.update({
		where: { id: repo.prompt.id },
		data: { content: formData.content, aIModelId: formData.model }
	});
}

export async function deleteRepo(id) {
	await prisma.repo.updateMany({
		where: { parentId: id },
		data: { parentId: null }
	});

	await prisma.repo.update({
		where: { id: id },
		data: { isDeleted: true }
	});
}

export async function forkRepo(event, data) {
	const dbUser = await getDBUser(event);

	if (!dbUser) {
		throw Error('No user found');
	}

	await prisma.repo.update({
		where: {
			id: data.id
		},
		data: {
			noTimesForked: {
				increment: 1
			}
		}
	});

	return await prisma.repo.create({
		data: {
			id: nanoid(),
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
			prompts: {
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

export async function repoLoad({ params }) {
	const id = params.id;

	if (!id) {
		throw error(404, {
			message: 'Not found'
		});
	}

	const repo = await getRepoById(id);
	const aiModels = await getAllAIModels();
	const tags = await getAllTags();

	if (!repo) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return { repo, aiModels, tags };
}
