import { searchRepos } from '$lib/core/repo';
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
	// find relevant data in the raw results
	// where the query matches
	return rawResults.map((repo) => ({
		value: repo.name,
	}));
}
