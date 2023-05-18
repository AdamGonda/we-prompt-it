import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createTag(data) {
	return await prisma.tag.create({ data });
}

export async function getTagById(id) {
	return await prisma.tag.findUnique({ where: { id } });
}

export async function getAllTags() {
	return await prisma.tag.findMany();
}

export async function updateTag(id, data) {
	return await prisma.tag.update({ where: { id }, data });
}

export async function deleteTag(id) {
	return await prisma.tag.delete({ where: { id } });
}
