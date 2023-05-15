import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createAIModel(data) {
	return await prisma.aIModel.create({ data });
}

export async function getAIModelById(id) {
	return await prisma.aIModel.findUnique({ where: { id } });
}

export async function getAllAIModels() {
	return await prisma.aIModel.findMany();
}

export async function updateAIModel(id, data) {
	return await prisma.aIModel.update({ where: { id }, data });
}

export async function deleteAIModel(id) {
	return await prisma.aIModel.delete({ where: { id } });
}
