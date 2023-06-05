import { PrismaClient } from '@prisma/client';
import { getAllAIModels, getAllTags, getDBUser, getPromptBySlug } from './shared';
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
	createUserOnFirstLogin(event);

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

async function createUserOnFirstLogin(event) {
	const session = await event.locals.getSession()

	if (session) {
		if (event.cookies.get('isOnboarded') !== hash(session.user.email)) {
			// at this point
			// 1. user is in session
			// 2. user has no cookie

			// now we need to check if user is in db
			const user = await getDBUser(session);

			if (user) {
				// if user is in db, cookie probably has been deleted, so we set it again
				console.log('set cookie');
				event.cookies.set(
					`isOnboarded=${hash(user.email)}; Max-Age=86400; Path=/; HttpOnly`
				);
			} else {
				// create new user in db
				console.log('create new user');
				createUser(session)
			}
		}
	}
}

async function createUser(session) {
	const username = session.user.name.split(' ').join('-').toLowerCase();

	// if no session user, throw error
	if (!session?.user) {
		throw error(401, { message: 'Unauthorized' });
	}

	// check if user with the same email in the database
	const user = await prisma.user.findUnique({
		where: {
			email: session.user.email
		}
	});

	if(user && user.isDeleted === false) {
		throw error(400, { message: 'User already exists for this session' });
	}

	// check if user with the same username in the database
	const userWithsameUsername = await prisma.user.findUnique({
		where: {
			username
		}
	});

	if (userWithsameUsername && userWithsameUsername.isDeleted === false) {
		throw error(400, { message: 'Name is not unique' });
	}

	// if user with the same username exists, but deleted - restore it
	if (userWithsameUsername && userWithsameUsername.isDeleted === true) {
		await prisma.user.update({
			where: {
				id: userWithsameUsername.id
			},
			data: {
				isDeleted: false
			}
		});
	} else {
		// create new user with username, use session user to get firstName latName and email
		await prisma.user.create({
			data: {
				username,
				email: session.user.email,
				image: session.user.image,
			}
		});
	}

	return new Response(JSON.stringify({ status: 200 }));
}