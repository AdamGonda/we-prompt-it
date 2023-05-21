import { repoLoad } from "$lib/controllers/prompt";

export async function load(event) {
	return await repoLoad(event);
}