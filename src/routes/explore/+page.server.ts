import { getAllRepos, searchRepos } from '$lib/core/repo';

export async function load({ url }) {
	const query = url.searchParams.get('q');

	if (query) {
		return { initialLoadResults: await searchRepos(query) };
	}

	return { initialLoadResults: await getAllRepos() };
}
