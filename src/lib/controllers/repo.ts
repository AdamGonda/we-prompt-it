import { getDBUser } from '$lib/controllers/shared';
import { getAllAIModels, getAllTags, getRepoBySlug } from '$lib/controllers/shared';
import type { RequestEvent } from '@sveltejs/kit';

import { error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { createSchema, type EditForm, type ForkForm } from '$lib/zod-schemas';
import { convertToSlug, formDataToObject, zodCheck } from '$lib/utils';

const prisma = new PrismaClient();

export async function createRepo(event) {
	const user = await getDBUser(event);

	const formData = formDataToObject(await event.request.formData());
	const parseResult = createSchema.safeParse(formData);
	const data = zodCheck(parseResult, (errors) => {
		throw error(400, JSON.stringify(errors));
	});

	return await prisma.repo.create({
		data: {
			description: data.description,
			name: data.name,
			author: {
				connect: {
					id: user.id
				}
			},
			slug: convertToSlug(user.username, data.name),
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

	return await prisma.repo.update({
		where: { slug },
		data: {
			name: data.name,
			slug: convertToSlug(user.username, data.name),
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

export async function deleteRepo(slug) {
	const parent = await getRepoBySlug(slug);

	await prisma.repo.updateMany({
		where: { parentId: parent.id },
		data: { parentId: null }
	});

	await prisma.repo.update({
		where: { slug },
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
