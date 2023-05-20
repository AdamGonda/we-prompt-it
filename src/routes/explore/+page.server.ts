import { searchRepos } from "$lib/controllers/explore";
import { getAllRepos } from "$lib/controllers/shared";

export async function load({ url }) {
	const query = url.searchParams.get('q');

	if (query) {
		return { initialLoadResults: await searchRepos(query) };
	}

	return { initialLoadResults: await getAllRepos() };
}
