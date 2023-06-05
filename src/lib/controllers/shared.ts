import globalIncludes from '$lib/global-includes';
import { PrismaClient } from '@prisma/client';
import { error } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function createUser(session) {
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

export async function getPromptBySlug(slug) {
	const prompt = await prisma.prompt.findFirst({
		where: { slug, isDeleted: false },
		...globalIncludes
	});

	if (!prompt) {
		throw error(404, {
			message: 'Prompt not found'
		});
	}

	return prompt;
}

export async function getAllPrompts() {
	return await prisma.prompt.findMany({
		where: { isDeleted: false }
	});
}

export async function getAllAIModels() {
	return await prisma.aiModel.findMany({
		where: { isDeleted: false },
		orderBy: { prompts: { _count: 'desc' } }
	});
}

export async function getAllTags() {
	return await prisma.tag.findMany({
		where: { isDeleted: false },
		orderBy: { prompts: { _count: 'desc' } }
	});
}

export async function getDBUser(session) {

	const dbUser = await prisma.user.findUnique({
		where: { email: session.user.email }
	});

	if (dbUser?.isDeleted) {
		return null;
	}

	return dbUser;
}

export async function getOrCreateAiModel(data) {
	if (data.model != -1) {
		return data.model;
	}

	const whithSameName = await prisma.aiModel.findFirst({
		where: { name: data.newModelName }
	});

	if (whithSameName) {
		throw error(400, {
			message: 'Model with this name already exists'
		});
	}

	const newModel = await prisma.aiModel.create({
		data: {
			name: data.newModelName,
			link: data.newModelLink
		}
	});

	return newModel.id;
}

export async function getOrCreateTags(data) {
	if (data.tags == '') {
		return;
	}

	const tags = data.tags.split(', ');

	if (tags.lenght > 5) {
		throw error(400, {
			message: 'Too many tags'
		});
	}

	// check for existing tags by name
	// if they exist, use the existing tag id
	// if they don't exist, create them and use the new tag id
	const tagIdPromises = tags.map(async (tag) => {
		const existingTag = await prisma.tag.findFirst({
			where: { name: tag }
		});

		if (existingTag) {
			return existingTag.id;
		}

		const newTag = await prisma.tag.create({
			data: {
				name: tag,
				color: stringToColor(tag)
			}
		});

		return newTag.id;
	});

	return await Promise.all(tagIdPromises);
}

function stringToColor(str) {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	let color = '#';
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xaf; // change 0x7f to 0xaf
		color += ('00' + value.toString(16)).substr(-2);
	}
	return color;
}
