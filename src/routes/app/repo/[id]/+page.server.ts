import { getAllAIModels } from '$lib/core/ai-model';
import { getRepoById } from '$lib/core/repo';
import { addStar } from '$lib/core/star';
import { getAllTags } from '$lib/core/tag';
import { getUserByEmail } from '$lib/core/user.js';

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
		await addStar(user.id, Number(event.params.id));
	}
};
