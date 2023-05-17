import { searchRepos } from '$lib/core/repo';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const query = url.searchParams.get('q');
	const rawResults = await searchRepos(query);

	if (query) {
		return json(processResults(rawResults, query));
	}

	return json([]);
}

function processResults(rawResults, query) {
	// find relevant data in the raw results
	// where the query matches
	// name, description, prompt.content, prompt.aiModel.name, tags.name
	// find where it matches and just return the relevant data
	return rawResults.map((repo) => {
		// go through each field and find where is the match

		const match = (value) => value.toLowerCase().includes(query.toLowerCase());

		const bundle = {
			name: repo.name,
			description: repo.description,
			prompt: repo.prompt.content,
			aiModel: repo.prompt.aiModel.name,
			tags: repo.tags.map((tag) => tag.name)
		};

		let firstMatch = null
		// check each field in the bundle and stop when the first match found
		for (const [key, value] of Object.entries(bundle)) {
			if (match(value)) {
				firstMatch = value
				break
			}
		}

		return firstMatch
	});
}
