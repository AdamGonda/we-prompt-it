import { getAllAIModels } from '$lib/core/ai-model.js';
import { createRepo } from '$lib/core/repo.js';
import { getAllTags } from '$lib/core/tag.js';
import { formToObject } from '$lib/utils';

export async function load() {
	const aiModels = getAllAIModels();
	const tags = getAllTags();

	return { aiModels, tags };
}

export const actions = {
	default: async (event) => {
		if ((await event.locals.getSession()).user) {
			const formData = await event.request.formData();
			const obj = formToObject(formData);

			const newRepo = await createRepo(event, obj, { isForked: false });

			return { id: newRepo.id };
		}
	}
};
