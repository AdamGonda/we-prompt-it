import { deleteRepo, editRepo, repoLoad } from '$lib/features/repo';
import { formToObject } from '$lib/utils';
import { redirect } from '@sveltejs/kit';


export async function load(event) {
	return await repoLoad(event);
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
