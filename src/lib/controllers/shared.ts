import { PrismaClient } from "@prisma/client";
import { error } from "@sveltejs/kit";

const prisma = new PrismaClient();


export async function getRepoBySlug(slug) {
  const repo = await prisma.repo.findFirst({
    where: { slug, isDeleted: false },
    include: {
      author: true, // TODO is this ok?
      stars: { where: { isDeleted: false } },
      changeRequests: { where: { isDeleted: false } },
			prompts: { where: { isDeleted: false } },
    },
  });

	if (!repo) {
		throw error(404, {
			message: 'Repo not found'
		});
	}

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

export async function getDBUser(event) {
	const session = await event.locals.getSession();

	if (!session || !session.user) {
		throw error(400, {
			message: 'Not logged in'
		});
	}

	const dbUser = await prisma.user.findUnique({
		where: { email: session.user.email }
	});

	if (!dbUser) {
		throw error(404, {
			message: 'User not found'
		});
	}

	return dbUser;
}
