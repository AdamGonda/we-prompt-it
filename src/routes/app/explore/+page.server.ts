import { searchRepos } from "$lib/core/repo";

export async function load({ url }) {
	const results = await searchRepos(url.searchParams.get('q'));

	return { results };
}


export const actions = {
	default: async () => {
		console.log('log default action')
	}
};
