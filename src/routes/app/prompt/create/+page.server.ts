import { formDataToObject, zodCheck } from '$lib/utils';
import { getAllAIModels, getAllTags } from '$lib/controllers/shared';
import { createRepo } from '$lib/controllers/prompt';
import { createSchema } from '$lib/zod-schemas.js';
import { error } from '@sveltejs/kit';

export async function load() {
	const aiModels = getAllAIModels();
	const tags = getAllTags();

	return { aiModels, tags };
}

export const actions = {
	default: async (event) => {
		if (!(await event.locals.getSession()).user) {
			throw error(400, {
				message: 'Not logged in'
			});
		}

		const formData = formDataToObject(await event.request.formData());

		const parseResult = createSchema.safeParse(formData);
		const data = zodCheck(parseResult, (errors) => {
			throw error(400, JSON.stringify(errors));
		});

		try {
			const newRepo = await createRepo(event, data);
			return { id: newRepo.id };
		} catch (error) {
			console.log('log error', error);
			throw error(400, {
				message: 'Error creating repo'
			});
		}
	}
};
