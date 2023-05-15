import { getAllAIModels } from '$lib/core/models/ai-model';
import { getRepoById } from '$lib/core/models/repo';
import { createStar } from '$lib/core/models/star';
import { getAllTags } from '$lib/core/models/tag';
import { getUserByEmail } from '$lib/core/models/user.js';

export function load({ params }) {
	const id = Number(params.id);
	const repo = getRepoById(id);
	const aiModels = getAllAIModels();
	const tags = getAllTags();

	return { repo, aiModels, tags };
}

export const actions = {
	addStar: async (event) => {
		const userEmail = (await event.locals.getSession()).user.email;
		const user = await getUserByEmail(userEmail);
		await createStar(user.id, Number(event.params.id));
	}
};
