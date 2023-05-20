import { formDataToObject } from '$lib/utils';
import { getAllAIModels, getAllTags, getRepoById } from '$lib/controllers/shared';
import { forkRepo } from '$lib/controllers/repo';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	const id = params.id;
	
	if (!id) {
    throw error(404, {
			message: 'Not found'
		});
	}
	
	const repo = getRepoById(id);
	const aiModels = getAllAIModels();
	const tags = getAllTags();

	return { repo, aiModels, tags };
}

export const actions = {
	default: async (event) => {
		if ((await event.locals.getSession()).user) {
			const formData = await event.request.formData();
			const pojo = formDataToObject(formData);

			const newRepo = await forkRepo(event, pojo);

			return { id: newRepo.id };
		}
	}
};
