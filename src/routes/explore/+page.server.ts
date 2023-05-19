import { searchRepos } from "$lib/feature/explore";
import { getAllRepos } from "$lib/feature/shared";

export async function load({ url }) {
	const query = url.searchParams.get('q');

	if (query) {
		return { initialLoadResults: await searchRepos(query) };
	}

	return { initialLoadResults: await getAllRepos() };
}
