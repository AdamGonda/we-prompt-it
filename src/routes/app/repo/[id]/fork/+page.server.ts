import { formToObject } from '$lib/utils';
import { getAllAIModels } from '$lib/context/ai-model';
import { getRepoById } from '$lib/feature/shared';
import { getAllTags } from '$lib/context/tag';
import { forkRepo } from '$lib/feature/fork-repo';

export function load({ params }) {
	const id = Number(params.id);
	const repo = getRepoById(id);
	const aiModels = getAllAIModels();
	const tags = getAllTags();

	return { repo, aiModels, tags };
}

export const actions = {
	default: async (event) => {
		if ((await event.locals.getSession()).user) {
			const formData = await event.request.formData();
			const obj = formToObject(formData);

			const newRepo = await forkRepo(event, obj);

			return { id: newRepo.id };
		}
	}
};
