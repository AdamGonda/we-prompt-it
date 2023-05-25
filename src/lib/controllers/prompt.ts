import { getAiModel, getDBUser, getTagIds } from '$lib/controllers/shared';
import { getAllAIModels, getAllTags, getPromptBySlug } from '$lib/controllers/shared';
import type { RequestEvent } from '@sveltejs/kit';

import { error, json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { convertToSlug, validateForm } from '$lib/utils';

const prisma = new PrismaClient();

// #region ACTIONS
export async function createPrompt(event: RequestEvent) {
	const user = await getDBUser(event);
	const data = await validateForm(event);
	const aiModelId = await getAiModel(data);
	const incomingTagIds = await getTagIds(data);

	return await prisma.prompt.create({
		data: {
			description: data.description,
			tags: {
				connect: incomingTagIds
					? incomingTagIds.map((tagId) => ({ id: tagId }))
					: undefined
			},
			name: data.name,
			author: {
				connect: {
					id: user.id
				}
			},
			slug: convertToSlug(user.username, data.name),
			content: data.content,
			aiModel: {
				connect: {
					id: aiModelId
				}
			}
		}
	});
}

export async function editPrompt(event: RequestEvent) {
	const slug = event.params.slug;
	const user = await getDBUser(event);
	const data = await validateForm(event);
	const aiModelId = await getAiModel(data);
	const incomingTagIds = await getTagIds(data);

	const promptToEdit = await prisma.prompt.findFirst({
		where: { slug, isDeleted: false },
		include: {
			tags: true
		}
	});

	if (!promptToEdit) {
		throw error(404, { message: 'Not found' });
	}

	if (promptToEdit.authorId !== user.id) {
		throw error(405, { message: 'Not allowed' });
	}

	const updateSlug = promptToEdit.name !== data.name;
	const tagIdsToRemove = promptToEdit.tags
		.map((tag) => tag.id)
		.filter((tagId) => !incomingTagIds?.includes(tagId));

	return await prisma.prompt.update({
		where: { slug },
		data: {
			name: data.name,
			slug: updateSlug ? convertToSlug(user.username, data.name) : promptToEdit.slug,
			description: data.description,
			tags: {
				connect: incomingTagIds
					? incomingTagIds.map((tagId) => ({ id: tagId }))
					: undefined,
				disconnect: tagIdsToRemove
					? tagIdsToRemove.map((tagId) => ({ id: tagId }))
					: undefined
			},
			content: data.content,
			aiModelId
		}
	});
}

export async function forkPrompt(event: RequestEvent) {
	const dbUser = await getDBUser(event);
	const slug = event.params.slug;
	const data = await validateForm(event);
	const aiModelId = await getAiModel(data);
	const incomingTagIds = await getTagIds(data);

	await prisma.prompt.update({
		where: {
			slug
		},
		data: {
			forkedCount: {
				increment: 1
			}
		}
	});

	return await prisma.prompt.create({
		data: {
			parentPrompt: {
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
			content: data.content,
			aiModel: {
				connect: {
					id: aiModelId
				}
			},
			tags: {
				connect: incomingTagIds
					? incomingTagIds.map((tagId) => ({ id: tagId }))
					: undefined
			}
		}
	});
}

export async function deletePrompt(event: RequestEvent) {
	const slug = event.params.slug;
	const parent = await getPromptBySlug(slug);

	await prisma.prompt.updateMany({
		where: { parentId: parent.id },
		data: { parentId: null }
	});

	await prisma.prompt.update({
		where: { slug },
		data: { isDeleted: true }
	});
}
// #endregion

// #region LOADERS
export async function loadPrompt({ params }) {
	const prompt = await getPromptBySlug(params.slug);
	const aiModels = await getAllAIModels();
	const tags = await getAllTags();

	if (!prompt) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return { prompt, aiModels, tags };
}

export async function loadEdit({ params }) {
	const prompt = await getPromptBySlug(params.slug);
	const aiModels = await getAllAIModels();
	const tags = await getAllTags();

	if (!prompt) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return { prompt, aiModels, tags };
}

export async function loadCreatePrompt() {
	const allModels = await getAllAIModels();
	const tags = await getAllTags();

	return { allModels, tags };
}
// #endregion

// #region API
export async function checkPromptNameUniqueness(event) {
	const proposedName = event.url.searchParams.get('proposedName');
	const promptId = event.url.searchParams.get('promptId');
	const user = await getDBUser(event);

	if (!proposedName || !promptId || !Number(promptId)) {
		throw error(400, {
			message: `Missing parameters`
		});
	}

	const existingPrompt = await prisma.prompt.findFirst({
		where: {
			slug: convertToSlug(user.username, proposedName),
			authorId: user.id
		}
	});

	if (existingPrompt && existingPrompt.id !== Number(promptId)) {
		return json({ isUnique: false });
	}

	return json({ isUnique: true });
}
// #endregion
