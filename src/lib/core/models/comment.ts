import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createComment(data) {
	return await prisma.comment.create({ data });
}

async function getCommentById(id) {
	return await prisma.comment.findUnique({ where: { id } });
}

async function updateComment(id, data) {
	return await prisma.comment.update({ where: { id }, data });
}

async function deleteComment(id) {
	return await prisma.comment.delete({ where: { id } });
}

export { createComment, getCommentById, updateComment, deleteComment };
