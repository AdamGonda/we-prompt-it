import { getDBUser } from '$lib/controllers/shared';
import { getAllAIModels, getAllTags, getRepoBySlug } from '$lib/controllers/shared';
import type { RequestEvent } from '@sveltejs/kit';

import { error, redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import {
	createSchema,
	editSchema,
	forkSchema
} from '$lib/zod-schemas';
import { convertToSlug, formDataToObject, zodCheck } from '$lib/utils';

const prisma = new PrismaClient();

// #region Actions
export async function createRepo(event: RequestEvent) {
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
					aiModelId: data.model
				}
			}
			// tags: {
			// 	connect: [{ id: tag1.id }]
			// },
		}
	});
}

export async function editRepo(event: RequestEvent) {
	const slug = event.params.slug;
	const user = await getDBUser(event);

	const formData = formDataToObject(await event.request.formData());
	const parseResult = editSchema.safeParse(formData);
	const data = zodCheck(parseResult, (errors) => {
		throw error(400, JSON.stringify(errors));
	});

	const repo = await prisma.repo.findFirst({
		where: { slug, isDeleted: false },
		include: { prompts: true }
	});

	if (!repo || repo.isDeleted) {
		throw error(404, { message: 'Not found' });
	}

	if (repo.authorId !== user.id) {
		throw error(405, { message: 'Not allowed' });
	}

	const editedRepo = await prisma.repo.update({
		where: { slug },
		data: {
			name: data.name,
			slug: convertToSlug(user.username, data.name),
			description: data.description,
			prompts: {
				create: {
					version: repo.prompts.length + 1,
					content: data.content,
					aiModelId: data.model
				}
			}
		}
	});

	throw redirect(302, `/app/prompt/${editedRepo.slug}`);
}

export async function deleteRepo(event: RequestEvent) {
	const slug = event.params.slug;
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

export async function forkRepo(event: RequestEvent) {
	const dbUser = await getDBUser(event);

	if (!dbUser) {
		throw Error('No user or parent repo found');
	}

	const formData = formDataToObject(await event.request.formData());
	const parseResult = forkSchema.safeParse(formData);
	const data = zodCheck(parseResult, (errors) => {
		throw error(400, JSON.stringify(errors));
	});

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
					aiModelId: data.model
				}
			}
			// tags: {
			// 	connect: [{ id: tag1.id }]
			// },
		}
	});
}
// #endregion

// #region LOADERS
export async function loadRepo({ params }) {
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

export async function loadCreateRepo() {
	const aiModels = await getAllAIModels();
	const tags = await getAllTags();

	return { aiModels, tags };
}
// #endregion
