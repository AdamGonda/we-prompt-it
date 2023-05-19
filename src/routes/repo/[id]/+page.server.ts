import { repoLoad } from '$lib/features/repo.js';

export async function load(event) {
	return await repoLoad(event);
}

