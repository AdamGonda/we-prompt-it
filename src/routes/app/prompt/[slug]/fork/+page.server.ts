import { getAllAIModels, getAllTags, getRepoBySlug } from '$lib/controllers/shared';
import { forkRepo } from '$lib/controllers/repo';

export function load({ params }) {
	const repo = getRepoBySlug(params.slug);
	const aiModels = getAllAIModels();
	const tags = getAllTags();

	return { repo, aiModels, tags };
}

export const actions = {
	default: forkRepo
};
