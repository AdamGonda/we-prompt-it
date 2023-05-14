import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createPromptContent(data) {
	return await prisma.promptContent.create({ data });
}

async function getPromptContentById(id) {
	return await prisma.promptContent.findUnique({ where: { id } });
}

async function updatePromptContent(id, data) {
	return await prisma.promptContent.update({ where: { id }, data });
}

async function deletePromptContent(id) {
	return await prisma.promptContent.delete({ where: { id } });
}

export {
	createPromptContent,
	getPromptContentById,
	updatePromptContent,
	deletePromptContent
};
