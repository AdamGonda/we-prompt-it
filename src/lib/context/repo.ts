import { PrismaClient } from '@prisma/client';
import { getDBUser } from './user';
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

export async function updateRepo(event, formData) {
	const id = Number(event.params.id);
	const user = await getDBUser(event);

	const repo = await prisma.repo.findUnique({
		where: { id },
		include: { prompt: true }
	});

	if (!repo) {
		throw new Error(`No repo found with id: ${id}`);
	}

	if(repo.isDeleted) {
		throw new Error(`Repo with id ${id} is deleted`);
	}

	if (repo.authorId !== user.id) {
		throw new Error(`User ${user.id} is not the author of repo ${id}`);
	}

	await prisma.repo.update({
		where: { id },
		data: {
			name: formData.name,
			description: formData.description
		}
	});

	await prisma.prompt.update({
		where: { id: repo.prompt.id },
		data: { content: formData.content, aIModelId: formData.model }
	});
}
