import { getAllAIModels } from '$lib/context/ai-model';
import { deleteRepo, getRepoById, updateRepo } from '$lib/context/repo';
import { getAllTags } from '$lib/context/tag';
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
	// TODO check if user is the owner
	edit: async ({ request, params }) => {
		const formData = await request.formData();
		const obj = formToObject(formData);

		await updateRepo(Number(params.id), obj);
		throw redirect(302, `/app/repo/${params.id}`)
	},
	delete: async ({ params }) => {
		await deleteRepo(Number(params.id))
	}
};
