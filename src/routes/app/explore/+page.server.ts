import { searchRepos } from "$lib/core/repo";

export async function load({ url }) {
	const initialLoadResults = await searchRepos(url.searchParams.get('q'));

	return { initialLoadResults };
}
