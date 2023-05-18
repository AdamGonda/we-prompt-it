import { getAllAIModels } from '$lib/core/ai-model';
import { getRepoById } from '$lib/core/repo';
import { getAllTags } from '$lib/core/tag';

export function load({ params }) {
	const id = Number(params.id);
	const repo = getRepoById(id);
	const aiModels = getAllAIModels();
	const tags = getAllTags();

	return { repo, aiModels, tags };
}
