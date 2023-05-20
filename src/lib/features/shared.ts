import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function getRepoById(id) {
  const repo = await prisma.repo.findFirst({
    where: { id, isDeleted: false },
    include: {
      author: true, // TODO is this ok?
      stars: { where: { isDeleted: false } },
      changeRequests: { where: { isDeleted: false } },
			prompts: { where: { isDeleted: false } },
    },
  });

	repo.prompts.sort((a, b) => b.version - a.version);
	
  return repo;
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
