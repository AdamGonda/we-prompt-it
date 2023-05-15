import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createComment(data) {
	return await prisma.comment.create({ data });
}

export async function getCommentById(id) {
	return await prisma.comment.findUnique({ where: { id } });
}

export async function updateComment(id, data) {
	return await prisma.comment.update({ where: { id }, data });
}

export async function deleteComment(id) {
	return await prisma.comment.delete({ where: { id } });
}

