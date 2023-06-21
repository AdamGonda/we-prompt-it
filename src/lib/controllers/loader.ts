import { PrismaClient } from '@prisma/client';
import {
	createUser,
	getAllAIModels,
	getAllTags,
	getDBUser,
	getPromptBySlug
} from './shared';
import { error } from '@sveltejs/kit';
import globalIncludes from '$lib/global-includes';

const prisma = new PrismaClient();

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

	if (!dbUser) {
		return {};
	}

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
		liked: like?.map((like) => like.prompt).filter((prompt) => !prompt.isDeleted)
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
	const profileUser = await prisma.user.findFirst({
		where: { username: event.params.username },
		include: {
			prompts: {
				where: { isDeleted: false },
				...globalIncludes
			}
		}
	});

	if (!profileUser) {
		throw error(404, {
			message: 'Not found'
		});
	}

	const allPrompts = await prisma.prompt.count({
		where: {
			authorId: profileUser.id,
			isDeleted: false
		}
	});

	// all the likes that the user has given
	const likesGiven = await prisma.like.count({
		where: {
			userId: profileUser.id,
			isDeleted: false
		}
	});

	// all the likes that the user's prompts have received
	const likesReceived = await prisma.like.count({
		where: {
			prompt: {
				authorId: profileUser.id,
				isDeleted: false
			},
			isDeleted: false
		}
	});

	// total number of times other users have forked the user's prompts
	const userPrompts = await prisma.prompt.findMany({
		where: {
			authorId: profileUser.id
		}
	});

	const forked = userPrompts.reduce((total, prompt) => total + prompt.forkedCount, 0);

	return { profileUser, allPrompts, likesGiven, likesReceived, forked };
}

export async function loadOnboarding(event) {
	const session = await event.locals.getSession();
	const dbUser = await getDBUser(session);

	return { dbUser };
}
