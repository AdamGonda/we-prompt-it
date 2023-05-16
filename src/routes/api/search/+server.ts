import { searchRepos } from "$lib/core/repo";
import { json } from "@sveltejs/kit";

export async function GET({ url }) {
  console.log('log endpoint Hit', typeof url.searchParams.get('q') )
  const results = await searchRepos(url.searchParams.get('q'));
  console.log('log results', results)

  return await json(results)
}