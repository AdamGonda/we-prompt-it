import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createPrompt(data) {
	return await prisma.prompt.create({ data });
}

export async function getPromptById(id) {
	return await prisma.prompt.findUnique({ where: { id } });
}

export async function updatePrompt(id, data) {
	return await prisma.prompt.update({ where: { id }, data });
}

export async function deletePrompt(id) {
	return await prisma.prompt.delete({ where: { id } });
}
