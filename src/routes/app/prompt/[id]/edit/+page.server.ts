import { updateRepo } from '$lib/core/models/repo';
import { formToObject } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

export const actions = {
	editPrompt: async ({ request, params }) => {
    const formData = await request.formData();
		const obj = formToObject(formData);

		await updateRepo(Number(params.id), obj);
		throw redirect(301, '/app');
    },
	
};