import { repoLoad } from "$lib/controllers/repo";

export async function load(event) {
	return await repoLoad(event);
}