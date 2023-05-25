import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function loadLanding() {
	const mostLiked = await prisma.prompt.findMany({
		where: {
			isDeleted: false
		},
		include: {
			likes: { where: { isDeleted: false } },
			prompts: {
				include: {
					aiModel: true
				}
			},
			tags: true
		},
		orderBy: {
			likes: {
				_count: 'desc'
			}
		},
		take: 10
	});

	const mostForked = await prisma.prompt.findMany({
		where: {
			isDeleted: false
		},
		include: {
			likes: true,
			prompts: {
				include: {
					aiModel: true
				}
			},
			tags: true
		},
		orderBy: {
			noTimesForked: 'desc'
		},
		take: 10
	});

	return { mostLiked, mostForked };
}
