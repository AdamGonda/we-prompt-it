import { PrismaClient } from '@prisma/client';
import {
	createUser,
	getAllAIModels,
	getAllTags,
	getDBUser,
	getPromptBySlug
} from './shared';
import { error, redirect } from '@sveltejs/kit';
import { _search } from './api';
import globalIncludes from '$lib/global-includes';
import { hash } from '$lib/utils';

const prisma = new PrismaClient();

export async function loadIndex(event) {
	return {
		prompts: await _search(event)
	};
}

export async function loadIndexLayout(event) {
	const session = await event.locals.getSession();
	let dbUser = null;
	let forceOnboarding = false;

	if (session) {
		dbUser = await getDBUser(session);

		if (!dbUser) {
			forceOnboarding = true;
		}
	}

	return { session, dbUser, forceOnboarding };
}

export async function loadMyCollection(event) {
	const session = await event.locals.getSession();

	const dbUser = await getDBUser(session);

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
				where: { isDeleted: false },
				...globalIncludes
			}
		}
	});

	if (!user) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return { user };
}

export async function loadOnboarding(event) {
	const session = await event.locals.getSession();
	const dbUser = await getDBUser(session);

	return { dbUser };
}
