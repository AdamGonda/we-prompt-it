import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createPrompt(data) {
	return await prisma.prompt.create({ data });
}

async function getPromptById(id) {
	return await prisma.prompt.findUnique({
		where: { id },
		include: {
			author: true,
			content: {
				include: {
					aiModel: true,
				}
			}
		}
	});
}

async function getAllPrompts() {
	return await prisma.prompt.findMany({ include: { stars: true } });
}

async function updatePrompt(id, data) {
	return await prisma.prompt.update({ where: { id }, data });
}

async function deletePrompt(id) {
	return await prisma.prompt.delete({ where: { id } });
}

export { createPrompt, getPromptById, updatePrompt, deletePrompt, getAllPrompts };
