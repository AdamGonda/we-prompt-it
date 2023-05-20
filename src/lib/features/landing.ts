import mpClient from '$lib/mp-client';

export async function landingLoad() {
	const mostLiked = await mpClient.repo.findMany({
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

	const mostForked = await mpClient.repo.findMany({
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
