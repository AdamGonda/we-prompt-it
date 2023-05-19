import { repoLoad } from "$lib/features/repo";

export async function load(event) {
	return await repoLoad(event);
}