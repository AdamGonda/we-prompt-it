import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function loadLanding() {
	const mostLiked = await prisma.repo.findMany({
		where: {
			isDeleted: false
		},
		include: {
			likes:  { where: { isDeleted: false } },
			prompts: true,
		},
		orderBy: {
			likes:  {
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
			likes:  true,
			prompts: true,
		},
		orderBy: {
			noTimesForked: 'desc',
		},
		take: 10,
	});

	return { mostLiked, mostForked }
}
