import { getAllAIModels, getAllTags } from '$lib/controllers/shared';
import { createRepo } from '$lib/controllers/repo';

export async function load() {
	const aiModels = getAllAIModels();
	const tags = getAllTags();

	return { aiModels, tags };
}

export const actions = {
	default: createRepo
};
