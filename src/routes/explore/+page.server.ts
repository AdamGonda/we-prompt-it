import { getAllRepos } from '$lib/context/repo';
import { searchRepos } from '$lib/feature/search';

export async function load({ url }) {
	const query = url.searchParams.get('q');

	if (query) {
		return { initialLoadResults: await searchRepos(query) };
	}

	return { initialLoadResults: await getAllRepos() };
}
