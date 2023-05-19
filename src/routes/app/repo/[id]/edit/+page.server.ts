import loadRepo from '$lib/feature/load-repo.js';
import { updateRepo } from '$lib/context/repo';
import { deleteRepo } from '$lib/feature/delete-repo';
import { formToObject } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
	return await loadRepo(event);
}

export const actions = {
	// TODO check if user is the owner
	edit: async ({ request, params }) => {
		const formData = await request.formData();
		const obj = formToObject(formData);

		try {
			await updateRepo(Number(params.id), obj);
		} catch (error) {
			console.log('log error', error)
			throw redirect(302, `/`);
		}

		throw redirect(302, `/app/repo/${params.id}`);
	},
	delete: async ({ params }) => {
		await deleteRepo(Number(params.id));
	}
};
