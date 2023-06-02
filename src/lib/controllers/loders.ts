import { PrismaClient } from '@prisma/client';
import { getAllAIModels, getAllTags, getDBUser, getPromptBySlug } from './shared';
import { error } from '@sveltejs/kit';
import { _search } from './api';
import globalIncludes from '$lib/global-includes';

const prisma = new PrismaClient();

export async function loadIndex(event) {
	if (event.url.searchParams.has('skip_loader')) {
		return {};
	}

	return {
		prompts: await _search(event)
	};
}

export async function loadIndexLayout(event) {
	const session = await event.locals.getSession();
	let dbUser = null;

	if (session) {
		dbUser = await getDBUser(event);
	}

	return { session, dbUser };
}

export async function loadMyCollection(event) {
	const dbUser = await getDBUser(event);

	const createdBy = await prisma.prompt.findMany({
		where: {
			authorId: dbUser.id,
			isDeleted: false
		},
		include: {
			likes: { where: { isDeleted: false } },
			tags: true,
			aiModel: true,
			author: true
		}
	});

	const like = await prisma.like.findMany({
		where: {
			userId: dbUser.id,
			isDeleted: false
		},
		include: {
			prompt: {
				include: {
					likes: { where: { isDeleted: false } },
					tags: true,
					aiModel: true,
					author: true
				}
			}
		}
	});

	return {
		createdBy,
		liked: like?.map((like) => like.prompt)
	};
}

export async function loadPrompt(event) {
	const prompt = await getPromptBySlug(event.params.slug);

	if (!prompt) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return { prompt };
}

export async function loadEditFork({ params }) {
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

export async function loadProfile(event) {
	// if id is not present trhow 404
	if (!event.params.username) {
		throw error(404, {
			message: 'Not found'
		});
	}

	// get user by id, prisma
	const user = await prisma.user.findFirst({
		where: { username: event.params.username },
		include: {
			prompts: {
				...globalIncludes
			}
		}
	});

	return { user };
}
