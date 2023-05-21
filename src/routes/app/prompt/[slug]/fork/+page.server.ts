import { formDataToObject, zodCheck } from '$lib/utils';
import { getAllAIModels, getAllTags, getRepoBySlug } from '$lib/controllers/shared';
import { forkRepo } from '$lib/controllers/prompt';
import { error } from '@sveltejs/kit';
import { forkSchema } from '$lib/zod-schemas';

export function load({ params }) {
	const repo = getRepoBySlug(params.name);
	const aiModels = getAllAIModels();
	const tags = getAllTags();

	return { repo, aiModels, tags };
}

export const actions = {
	default: async (event) => {
		if (!(await event.locals.getSession()).user) {
			throw error(400, {
				message: 'Not logged in'
			});
		}

		const formData = formDataToObject(await event.request.formData());

		const parseResult = forkSchema.safeParse(formData);
		const data = zodCheck(parseResult, (errors) => {
			throw error(400, JSON.stringify(errors));
		});

		try {
			const newRepo = await forkRepo(event, data);
			return { id: newRepo.id };
		} catch (error) {
			console.log('log error', error);

			throw error(400, {
				message: 'Error forking repo'
			});
		}
	}
};
