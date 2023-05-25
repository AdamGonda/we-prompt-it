import { loadPrompt } from "$lib/controllers/prompt";

export async function load(event) {
	return await loadPrompt(event);
}