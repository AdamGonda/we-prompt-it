import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function getRepoById(id) {
	return await prisma.repo.findFirst({
		where: { id, isDeleted: false },
		include: {
			author: true,
			stars: { where: { isDeleted: false } },
			prompt: {
				include: {
					aiModel: true
				}
			},
			changeRequests: true
		}
	});
}

export async function getAllRepos() {
	return await prisma.repo.findMany({
		where: { isDeleted: false },
		include: { stars: { where: { isDeleted: false } } }
	});
}

export async function getAllAIModels() {
	return await prisma.aIModel.findMany();
}

export async function getAllTags() {
	return await prisma.tag.findMany();
}