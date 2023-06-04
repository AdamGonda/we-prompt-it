import { PrismaClient } from '@prisma/client';
import { getAllAIModels, getAllTags, getDBUser, getPromptBySlug } from './shared';
import { error, redirect } from '@sveltejs/kit';
import { _search } from './api';
import globalIncludes from '$lib/global-includes';

const prisma = new PrismaClient();

export async function loadIndex(event) {
	return {
		prompts: await _search(event)
	};
}

export async function loadIndexLayout(event) {
	if (!event.route.id.includes('api')) {
		const session = await event.locals.getSession();

		if (session) {
			if (!event.cookies.get('isOnboarded')) {
				// at this point
				// 1. user is in session
				// 2. user has no cookie

				// now we need to check if user is in db
				const user = await getDBUser(session);

				if (user && !event.cookies.get('isOnboarded')) {
					console.log('set cookie');
					// if user is in db, cookie probably has been deleted, so we set it again
					event.cookies.set('isOnboarded=true; Max-Age=86400; Path=/; HttpOnly');
				} else if (!user && event.route.id !== '/app/onboarding') {
					console.log('redirect');
					throw redirect(308, '/app/onboarding');
				}
			}
		}
	}

	const session = await event.locals.getSession();
	let dbUser = null;

	if (session) {
		// TODO performace issue? to hit the db every time we visit a page?
		dbUser = await getDBUser(session);
	}

	// if (session) {
	// TODO revise if this needed or not
	// 	if (event.route.id !== '/login' && (!dbUser || !dbUser.isOnboarded)) {
	// 		throw redirect(308, '/login');
	// 	}
	// }

	return { session, dbUser };
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

export async function loadOnboarding(event) {
	const session = await event.locals.getSession();
	const dbUser = await getDBUser(session);

	return { dbUser };
}
