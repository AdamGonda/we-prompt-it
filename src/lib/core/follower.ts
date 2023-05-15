import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createFollower(data) {
	return await prisma.follower.create({ data });
}

export async function getFollowerById(id) {
	return await prisma.follower.findUnique({ where: { id } });
}

export async function updateFollower(id, data) {
	return await prisma.follower.update({ where: { id }, data });
}

export async function deleteFollower(id) {
	return await prisma.follower.delete({ where: { id } });
}

