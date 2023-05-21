import { repoLoad } from '$lib/controllers/repo.js';

export async function load(event) {
	return await repoLoad(event);
}

