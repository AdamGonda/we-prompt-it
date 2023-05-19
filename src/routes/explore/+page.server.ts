import { searchRepos } from "$lib/features/explore";
import { getAllRepos } from "$lib/features/shared";

export async function load({ url }) {
	const query = url.searchParams.get('q');

	if (query) {
		return { initialLoadResults: await searchRepos(query) };
	}

	return { initialLoadResults: await getAllRepos() };
}
