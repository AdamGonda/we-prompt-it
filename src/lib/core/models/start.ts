import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createStar(data) {
	return await prisma.star.create({ data });
}

async function getStarById(id) {
	return await prisma.star.findUnique({ where: { id } });
}

async function updateStar(id, data) {
	return await prisma.star.update({ where: { id }, data });
}

async function deleteStar(id) {
	return await prisma.star.delete({ where: { id } });
}

export { createStar, getStarById, updateStar, deleteStar };
