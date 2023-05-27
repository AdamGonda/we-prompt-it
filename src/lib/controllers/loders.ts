import { _search } from "./explore";
import { getAllAIModels, getAllTags } from "./shared";


export async function loadExplore(event) {
	return { 
		prompts: await _search(event),
		tags: await getAllTags(),
		aiModels: await getAllAIModels()
	};
}