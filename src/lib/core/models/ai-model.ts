import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createAIModel(data) {
	return await prisma.aIModel.create({ data });
}

async function getAIModelById(id) {
	return await prisma.aIModel.findUnique({ where: { id } });
}

async function updateAIModel(id, data) {
	return await prisma.aIModel.update({ where: { id }, data });
}

async function deleteAIModel(id) {
	return await prisma.aIModel.delete({ where: { id } });
}

export { createAIModel, getAIModelById, updateAIModel, deleteAIModel };
