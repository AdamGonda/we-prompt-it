import { getDBUser } from '$lib/controllers/shared';
import { getAllAIModels, getAllTags, getRepoBySlug } from '$lib/controllers/shared';
import type { RequestEvent } from '@sveltejs/kit';

import { error, json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { convertToSlug, validateForm } from '$lib/utils';

const prisma = new PrismaClient();

// #region ACTIONS
export async function createRepo(event: RequestEvent) {
	const user = await getDBUser(event);
	const data = await validateForm(event);

	let newModel = null;
	if (data.model === -1) {
		newModel = await prisma.aiModel.create({
			data: {
				name: data.newModelName,
				link: data.newModelLink
			}
		});
	}

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
					aiModelId: newModel ? newModel.id : data.model
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
	const data = await validateForm(event);

	const repoToEdit = await prisma.repo.findFirst({
		where: { slug, isDeleted: false },
		include: { prompts: true }
	});

	if (!repoToEdit || repoToEdit.isDeleted) {
		throw error(404, { message: 'Not found' });
	}

	if (repoToEdit.authorId !== user.id) {
		throw error(405, { message: 'Not allowed' });
	}

	const updateSlug = repoToEdit.name !== data.name;

	return await prisma.repo.update({
		where: { slug },
		data: {
			name: data.name,
			slug: updateSlug ? convertToSlug(user.username, data.name) : repoToEdit.slug,
			description: data.description,
			prompts: {
				create: {
					version: repoToEdit.prompts.length + 1,
					content: data.content,
					aiModelId: data.model
				}
			}
		}
	});
}

export async function forkRepo(event: RequestEvent) {
	const dbUser = await getDBUser(event);
	const slug = event.params.slug;

	if (!dbUser) {
		throw Error('No user or parent repo found');
	}

	const data = await validateForm(event);

	await prisma.repo.update({
		where: {
			slug
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
					slug
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
	const allModels = await getAllAIModels();
	const tags = await getAllTags();

	return { allModels, tags };
}
// #endregion

// #region API
export async function checkRepoNameUniqueness(event) {
	const proposedName = event.url.searchParams.get('proposedName');
	const user = await getDBUser(event);

	if (!proposedName) {
		throw error(400, {
			message: `Missing parameter proposedName`
		});
	}

	const existingRepo = await prisma.repo.findFirst({
		where: {
			slug: convertToSlug(user.username, proposedName),
			authorId: user.id
		}
	});

	if (existingRepo) {
		return json({ isUnique: false });
	}

	return json({ isUnique: true });
}
// #endregion
