import { searchRepos } from "$lib/core/repo";
import { json } from "@sveltejs/kit";

export async function GET({ url }) {
  const results = await searchRepos(url.searchParams.get('q'));
  return await json(results)
}