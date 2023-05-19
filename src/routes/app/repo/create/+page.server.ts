import { createRepo } from '$lib/feature/create-repo.js';
import { formToObject } from '$lib/utils';
import { getAllAIModels, getAllTags } from '$lib/feature/shared';

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

			const newRepo = await createRepo(event, obj);

			return { id: newRepo.id };
		}
	}
};
