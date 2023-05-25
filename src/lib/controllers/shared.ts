import { PrismaClient } from '@prisma/client';
import { error } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function getPromptBySlug(slug) {
	const prompt = await prisma.prompt.findFirst({
		where: { slug, isDeleted: false },
		include: {
			author: true, // TODO is this ok?
			likes:  { where: { isDeleted: false } },
			tags: { where: { isDeleted: false } }
		}
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
		where: { isDeleted: false },
	});
}

export async function getAllAIModels() {
	return await prisma.aiModel.findMany();
}

export async function getAllTags() {
	return await prisma.tag.findMany({
		where: { isDeleted: false },
		orderBy: { prompts: { _count: 'desc' } },
	});
}

export async function getDBUser(event) {
	const session = await event.locals.getSession();

	if (!session || !session.user) {
		throw error(400, {
			message: 'Not logged in'
		});
	}

	const dbUser = await prisma.user.findUnique({
		where: { email: session.user.email }
	});

	if (!dbUser) {
		throw error(404, {
			message: 'User not found'
		});
	}

	return dbUser;
}

export async function getAiModel(data) {
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

export async function getTagIds(data) {
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
				name: tag
			}
		});

		return newTag.id;
	});

	return await Promise.all(tagIdPromises);
}
