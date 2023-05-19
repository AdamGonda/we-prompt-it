import { getAllAIModels } from "$lib/context/ai-model";
import { getRepoById } from "$lib/feature/shared";
import { getAllTags } from "$lib/context/tag";

export default async ({ params }) => {
	const id = Number(params.id);
	const repo = await getRepoById(id);
	const aiModels = await getAllAIModels();
	const tags = await getAllTags();

	return { repo, aiModels, tags };
}