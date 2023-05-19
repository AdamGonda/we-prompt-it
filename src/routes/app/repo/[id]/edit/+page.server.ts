import loadRepo from '$lib/feature/load-repo.js';
import { deleteRepo } from '$lib/feature/delete-repo';
import { formToObject } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import { editRepo } from '$lib/feature/edit-repo';

export async function load(event) {
	return await loadRepo(event);
}

export const actions = {
	edit: async (event) => {
		const raw = await event.request.formData();
		const formData = formToObject(raw);

		try {
			await editRepo(event, formData);
		} catch (error) {
			console.log('log error', error)
			throw redirect(302, `/`);
		}

		throw redirect(302, `/app/repo/${event.params.id}`);
	},
	delete: async ({ params }) => {
		await deleteRepo(Number(params.id));
	}
};
