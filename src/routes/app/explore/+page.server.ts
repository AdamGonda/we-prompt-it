import { searchRepos } from "$lib/core/repo";

export async function load({ url }) {
	const query = url.searchParams.get('q')
	let results = []
	
	if(query){
		results = await searchRepos(query);
	}

	return { results };
}
