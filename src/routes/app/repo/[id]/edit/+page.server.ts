import { deleteRepo, editRepo, repoLoad } from '$lib/features/repo';
import { formDataToObject, zodCheck } from '$lib/utils';
import { editSchema } from '$lib/zod-schemas.js';
import { redirect, type RequestEvent } from '@sveltejs/kit';

export async function load(event) {
	return await repoLoad(event);
}

export const actions = {
	edit: async (event: RequestEvent) => {
		const formData = formDataToObject(await event.request.formData());

		const parseResult = (await editSchema).safeParse(formData);
		const data = zodCheck(parseResult);

		try {
			await editRepo(event, data);
		} catch (error) {
			console.log('log error', error);
			throw redirect(302, `/`);
		}

		throw redirect(302, `/app/repo/${event.params.id}`);
	},
	delete: async ({ params }) => {
		await deleteRepo(params.id);
	}
};
