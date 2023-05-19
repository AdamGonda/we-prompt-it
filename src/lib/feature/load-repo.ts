import { getAllAIModels, getAllTags, getRepoById } from "$lib/feature/shared";

export default async ({ params }) => {
	const id = Number(params.id);
	const repo = await getRepoById(id);
	const aiModels = await getAllAIModels();
	const tags = await getAllTags();

	return { repo, aiModels, tags };
}