import { searchRepos } from '$lib/features/explore';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const query = url.searchParams.get('q');

	if (query) {
		return json(await searchRepos(query));
	}

	return json([]);
}
