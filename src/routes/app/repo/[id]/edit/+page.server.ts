import loadRepo from '$lib/feature/load-repo.js';
import { updateRepo } from '$lib/context/repo';
import { deleteRepo } from '$lib/feature/delete-repo';
import { formToObject } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
	return await loadRepo(event);
}

export const actions = {
	edit: async (event) => {
		const raw = await event.request.formData();
		const formData = formToObject(raw);

		try {
			await updateRepo(event, formData);
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
