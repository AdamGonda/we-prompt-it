import { searchRepos } from '$lib/core/repo.js';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  const query = url.searchParams.get('q')
	let results = []

	if(query){
		results = await searchRepos(query);
	}

  return await json({ results });
}
