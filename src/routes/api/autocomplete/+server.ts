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
	return rawResults.map((repo) => {
		const match = (value) => value.toLowerCase().includes(query.toLowerCase());

		const bundle = {
			name: repo.name,
			description: repo.description,
			prompt: repo.prompt.content,
			aiModel: repo.prompt.aiModel.name,
			tags: repo.tags.map((tag) => tag.name)
		};

		let firstMatch = null
		for (const [key, value] of Object.entries(bundle)) {
			if (match(value)) {
				firstMatch = value
				break
			}
		}

		return firstMatch
	});
}
