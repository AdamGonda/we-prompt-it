import { getAllAIModels } from '$lib/core/models/ai-model';
import { getRepoById, updateRepo } from '$lib/core/models/repo';
import { getAllTags } from '$lib/core/models/tag';
import { formToObject } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

export function load({ params }) {
	const id = Number(params.id);
	const repo = getRepoById(id);
	const aiModels = getAllAIModels();
	const tags = getAllTags();

	return { repo, aiModels, tags };
}

export const actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();
		const obj = formToObject(formData);

		await updateRepo(Number(params.id), obj);
		throw redirect(301, `/app/repo/${params.id}`);
	}
};
