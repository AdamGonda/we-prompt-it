import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createFollower(data) {
	return await prisma.follower.create({ data });
}

async function getFollowerById(id) {
	return await prisma.follower.findUnique({ where: { id } });
}

async function updateFollower(id, data) {
	return await prisma.follower.update({ where: { id }, data });
}

async function deleteFollower(id) {
	return await prisma.follower.delete({ where: { id } });
}

export { createFollower, getFollowerById, updateFollower, deleteFollower };
