import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createTag(data) {
	return await prisma.tag.create({ data });
}

async function getTagById(id) {
	return await prisma.tag.findUnique({ where: { id } });
}

async function updateTag(id, data) {
	return await prisma.tag.update({ where: { id }, data });
}

async function deleteTag(id) {
	return await prisma.tag.delete({ where: { id } });
}

export { createTag, getTagById, updateTag, deleteTag };
