import { getOrCreateAiModel, getDBUser, getOrCreateTags } from '$lib/controllers/shared';
import { getPromptBySlug } from '$lib/controllers/shared';
import type { RequestEvent } from '@sveltejs/kit';

import { error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { convertToSlug, validateForm } from '$lib/utils';
import { promptToString } from './api';
import { createUserSchema, promptSchema } from '$lib/yup-schemas';

const prisma = new PrismaClient();

export async function createUser(event: RequestEvent) {
	const data = await validateForm(event, createUserSchema);
	const session = await event.locals.getSession()

	// if no session user, throw error
	if (!session.user) {
		throw error(401, JSON.stringify({ name: 'Unauthorized' }));
	}

	// check if user with the same username is not already in the database
	const existingUser = await prisma.user.findUnique({
		where: {
			username: data.name,
		}
	});

	if (existingUser && existingUser.isDeleted === false) {
		throw error(400, JSON.stringify({ name: 'Name is not unique' }));
	}

	// create new user with username, use session user to get firstName latName and email
	await prisma.user.create({
		data: {
			username: data.name,
			firstName: session.user.name.split(' ')[0],
			lastName: session.user.name.split(' ')[1],
			email: session.user.email,
			isOnboarded: true
		}
	});
}

export async function createPrompt(event: RequestEvent) {
	const user = await getDBUser(event);
	const data = await validateForm(event, promptSchema);
	const aiModelId = await getOrCreateAiModel(data);
	const tagIds = await getOrCreateTags(data);

	return await prisma.prompt.create({
		data: {
			description: data.description,
			tags: {
				connect: tagIds ? tagIds.map((tagId) => ({ id: tagId })) : undefined
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
			},
			fulltext: promptToString({
				name: data.name,
				description: data.description,
				content: data.content
			})
		}
	});
}

export async function editPrompt(event: RequestEvent) {
	const slug = event.params.slug;
	const user = await getDBUser(event);
	const data = await validateForm(event, promptSchema);
	const aiModelId = await getOrCreateAiModel(data);
	const tagIds = await getOrCreateTags(data);

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
		.filter((tagId) => !tagIds?.includes(tagId));

	return await prisma.prompt.update({
		where: { slug },
		data: {
			name: data.name,
			slug: updateSlug ? convertToSlug(user.username, data.name) : promptToEdit.slug,
			description: data.description,
			tags: {
				connect: tagIds ? tagIds.map((tagId) => ({ id: tagId })) : undefined,
				disconnect: tagIdsToRemove
					? tagIdsToRemove.map((tagId) => ({ id: tagId }))
					: undefined
			},
			content: data.content,
			aiModelId,
			fulltext: promptToString({
				name: data.name,
				description: data.description,
				content: data.content
			})
		}
	});
}

export async function forkPrompt(event: RequestEvent) {
	const dbUser = await getDBUser(event);
	const slug = event.params.slug;
	const data = await validateForm(event, promptSchema);
	const aiModelId = await getOrCreateAiModel(data);
	const tagIds = await getOrCreateTags(data);

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
				connect: tagIds ? tagIds.map((tagId) => ({ id: tagId })) : undefined
			},
			fulltext: promptToString({
				name: data.name,
				description: data.description,
				content: data.content
			})
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
