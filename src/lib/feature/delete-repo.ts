import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function deleteRepo(id) {
	await prisma.repo.updateMany({
		where: { parentId: id },
		data: { parentId: null }
	});

	await prisma.repo.update({
		where: { id: id },
		data: { isDeleted: true }
	});
}
