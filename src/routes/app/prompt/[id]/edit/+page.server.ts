import { updatePrompt } from '$lib/core/models/prompt';
import { formToObject } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

export const actions = {
	editPrompt: async ({ request, params }) => {
        const formData = await request.formData();
		const obj = formToObject(formData);

		await updatePrompt(Number(params.id), obj);
		throw redirect(301, '/app');
    },
	
};