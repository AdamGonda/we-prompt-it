import { deleteRepo, editRepo, repoLoad } from '$lib/controllers/repo';
import { formDataToObject, zodCheck } from '$lib/utils';
import { editSchema } from '$lib/zod-schemas.js';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';

export async function load(event) {
	return await repoLoad(event);
}

export const actions = {
	edit: async (event: RequestEvent) => {
		if (!(await event.locals.getSession()).user) {
			throw error(400, {
				message: 'Not logged in'
			});
		}
		
		const formData = formDataToObject(await event.request.formData());

		const parseResult = editSchema.safeParse(formData);
		const data = zodCheck(parseResult, (errors) => {
			throw error(400, JSON.stringify(errors));
		});

		try {
			await editRepo(event, data);
		} catch (error) {
			console.log('log error', error);
			throw redirect(302, `/`);
		}

		throw redirect(302, `/app/repo/${event.params.slug}`);
	},
	delete: async ({ params }) => {
		await deleteRepo(params.id);
	}
};
