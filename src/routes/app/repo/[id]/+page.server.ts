import { getAllAIModels } from '$lib/context/ai-model';
import { getRepoById } from '$lib/context/repo';
import { getAllTags } from '$lib/context/tag';
import { redirect } from '@sveltejs/kit';

// TODO abstract this to a function {get repo suff}
export async function load({ params }) {
	const id = Number(params.id);
	const repo = await getRepoById(id);
	const aiModels = await getAllAIModels();
	const tags = await getAllTags();

	if(!repo) {
		throw redirect(302, `/`)
	}

	return { repo, aiModels, tags };
}
