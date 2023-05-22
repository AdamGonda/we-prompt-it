import { loadRepo } from "$lib/controllers/repo";

export async function load(event) {
	return await loadRepo(event);
}