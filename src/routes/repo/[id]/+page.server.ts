import { getAllAIModels } from '$lib/context/ai-model';
import { getRepoById } from '$lib/context/repo';
import { getAllTags } from '$lib/context/tag';

export function load({ params }) {
	const id = Number(params.id);
	const repo = getRepoById(id);
	const aiModels = getAllAIModels();
	const tags = getAllTags();

	return { repo, aiModels, tags };
}

