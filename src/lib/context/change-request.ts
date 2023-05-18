import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createChangeRequest(data) {
	return await prisma.changeRequest.create({ data });
}

export async function getChangeRequestById(id) {
	return await prisma.changeRequest.findUnique({ where: { id } });
}

export async function updateChangeRequest(id, data) {
	return await prisma.changeRequest.update({ where: { id }, data });
}

export async function deleteChangeRequest(id) {
	return await prisma.changeRequest.delete({ where: { id } });
}

