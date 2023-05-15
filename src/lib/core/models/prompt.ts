import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createPrompt(event, data) {
	const session = event.locals.getSession();
	const userEmail = (await session).user.email;

	const user = await prisma.user.findUnique({
		where: {
			email: userEmail
		}
	});

	if (!user) {
		throw Error('No user found');
	}

	return await prisma.prompt.create({
		data: {
			description: data.description,
			title: data.title,
			author: {
				connect: {
					id: user.id
				}
			},
			content: {
				create: {
					version: '1.0',
					content: data.content,
					aIModelId: 1
				}
			}
			// tags: {
			// 	connect: [{ id: tag1.id }]
			// },
		}
	});
}

async function getPromptById(id) {
	return await prisma.prompt.findUnique({
		where: { id },
		include: {
			author: true,
			content: {
				include: {
					aiModel: true
				}
			},
			changeRequests: true
		}
	});
}

async function getAllPrompts() {
	return await prisma.prompt.findMany({ include: { stars: true } });
}

async function updatePrompt(id, data) {
	const prompt = await prisma.prompt.findUnique({
		where: { id },
		include: { content: true }
	});

	if (!prompt) {
		throw new Error(`No prompt found with id: ${id}`);
	}

	await prisma.prompt.update({
		where: { id },
		data: {
			title: data.title,
			description: data.description
		}
	});

	await prisma.promptContent.update({
		where: { id: prompt.content.id },
		data: { content: data.content, aIModelId: data.model }
	});
}

async function deletePrompt(id) {
	return await prisma.prompt.delete({ where: { id } });
}

export { createPrompt, getPromptById, updatePrompt, deletePrompt, getAllPrompts };
