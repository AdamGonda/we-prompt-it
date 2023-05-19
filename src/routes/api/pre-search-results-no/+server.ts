import { searchRepos } from '$lib/feature/explore';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const query = url.searchParams.get('q');
	const rawResults = await searchRepos(query);

	if (query) {
		return json(processResults(rawResults));
	}

	return json([]);
}

function processResults(rawResults) {
	if(rawResults.length === 0) {
		return 0
	}

	return rawResults.length
}
