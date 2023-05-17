import { getAllAIModels } from '$lib/core/ai-model.js';
import { createRepo } from '$lib/core/repo.js';
import { getAllTags } from '$lib/core/tag.js';
import { formToObject } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const aiModels = getAllAIModels();
	const tags = getAllTags();

	return { aiModels, tags };
}

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const obj = formToObject(formData);

		await createRepo(event, obj);
		throw redirect(301, `/app/my-collection`);
	}
};
