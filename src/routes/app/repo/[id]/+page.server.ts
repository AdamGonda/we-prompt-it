import { getAllAIModels } from '$lib/core/models/ai-model';
import { getRepoById } from '$lib/core/models/repo';
import { getAllTags } from '$lib/core/models/tag';

export function load({ params }) {
	const id = Number(params.id)
	const repo = getRepoById(id)
	const aiModels = getAllAIModels()
	const tags = getAllTags()

	return { repo, aiModels, tags };
}
