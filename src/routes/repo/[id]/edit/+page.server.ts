import { getAllAIModels } from '$lib/core/ai-model';
import { deleteRepo, getRepoById, updateRepo } from '$lib/core/repo';
import { getAllTags } from '$lib/core/tag';
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
	edit: async ({ request, params }) => {
		const formData = await request.formData();
		const obj = formToObject(formData);

		await updateRepo(Number(params.id), obj);
		throw redirect(301, `/app/repo/${params.id}`);
	},
	delete: async ({ request, params }) => {
		await deleteRepo(Number(params.id))
		throw redirect(301, `/app/my-collection`);
	}
};
