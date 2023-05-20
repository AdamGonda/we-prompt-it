import { formDataToObject } from '$lib/utils';
import { getAllAIModels, getAllTags } from '$lib/controllers/shared';
import { createRepo } from '$lib/controllers/repo';

export async function load() {
	const aiModels = getAllAIModels();
	const tags = getAllTags();

	return { aiModels, tags };
}

export const actions = {
	default: async (event) => {
		if ((await event.locals.getSession()).user) {
			const formData = await event.request.formData();
			const pojo = formDataToObject(formData);

			const newRepo = await createRepo(event, pojo);

			return { id: newRepo.id };
		}
	}
};
