import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function landingLoad() {
	const mostLiked = await prisma.repo.findMany({
		where: {
			isDeleted: false
		},
		include: {
			stars: { where: { isDeleted: false } }
		},
		orderBy: {
			stars: {
				_count: 'desc'
			}
		},
		take: 10
	});

	const mostForked = await prisma.repo.findMany({
		where: {
			isDeleted: false,
		},
		include: {
			stars: true
		},
		orderBy: {
			noTimesForked: 'desc',
		},
		take: 10,
	});

	return { mostLiked, mostForked }
}
