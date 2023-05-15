import { redirect } from '@sveltejs/kit';
import { createRepo } from '$lib/core/models/repo.js';
import { formToObject } from '$lib/utils';
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

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const obj = formToObject(formData);

		await createRepo(event, obj);
		throw redirect(301, '/app');
	}
};