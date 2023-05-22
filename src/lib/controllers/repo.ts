import { getDBUser } from '$lib/controllers/user';
import { getAllAIModels, getAllTags, getRepoBySlug } from '$lib/controllers/shared';
import type { RequestEvent } from '@sveltejs/kit';

import { error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { EditForm, ForkForm } from '$lib/zod-schemas';
import { convertToSlug } from '$lib/utils';

const prisma = new PrismaClient();

export async function createRepo(event, data: EditForm) {
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
			slug: convertToSlug(dbUser.username, data.name),
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

export async function editRepo(event: RequestEvent, data: EditForm) {
	const slug = event.params.slug;
	const user = await getDBUser(event);

	const repo = await prisma.repo.findFirst({
		where: { slug, isDeleted: false },
		include: { prompts: true }
	});

	if (!repo) {
		throw new Error(`No repo found with id: ${id}`);
	}

	if (repo.isDeleted) {
		throw new Error(`Repo with id ${slug} is deleted`);
	}

	if (repo.authorId !== user.id) {
		throw new Error(`User ${user.id} is not the author of repo ${id}`);
	}

	await prisma.repo.update({
		where: { slug },
		data: {
			name: data.name,
			description: data.description,
			prompts: {
				create: {
					version: repo.prompts.length + 1,
					content: data.content,
					aIModelId: data.model
				}
			}
		}
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

export async function forkRepo(event: RequestEvent, data: ForkForm) {
	const dbUser = await getDBUser(event);
	const parentRepo = await getRepoBySlug(data.slug);

	if (!dbUser || !parentRepo) {
		throw Error('No user or parent repo found');
	}

	await prisma.repo.update({
		where: {
			slug: data.slug
		},
		data: {
			noTimesForked: {
				increment: 1
			}
		}
	});

	return await prisma.repo.create({
		data: {
			parentRepo: {
				connect: {
					slug: data.slug
				}
			},
			description: data.description,
			name: data.name,
			slug: convertToSlug(dbUser.username, data.name),
			author: {
				connect: {
					id: dbUser.id
				}
			},
			prompts: {
				create: {
					content: data.content,
					aIModelId: data.model
				}
			}
			// tags: {
			// 	connect: [{ id: tag1.id }]
			// },
		}
	});
}

export async function repoLoad({ params }) {
	const repo = await getRepoBySlug(params.slug);
	const aiModels = await getAllAIModels();
	const tags = await getAllTags();

	if (!repo) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return { repo, aiModels, tags };
}
