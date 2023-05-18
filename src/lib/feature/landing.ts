import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getLandingData() {
	const mostLiked = await prisma.repo.findMany({
		where: {
			isDeleted: false
		},
		include: {
			stars: true
		},
		orderBy: {
			stars: {
				_count: 'desc'
			}
		},
		take: 10
	});

	

	return { mostLiked }
}
