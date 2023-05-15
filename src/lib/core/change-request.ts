import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createChangeRequest(data) {
	return await prisma.changeRequest.create({ data });
}

async function getChangeRequestById(id) {
	return await prisma.changeRequest.findUnique({ where: { id } });
}

async function updateChangeRequest(id, data) {
	return await prisma.changeRequest.update({ where: { id }, data });
}

async function deleteChangeRequest(id) {
	return await prisma.changeRequest.delete({ where: { id } });
}

export {
	createChangeRequest,
	getChangeRequestById,
	updateChangeRequest,
	deleteChangeRequest
};
