import { repoLoad } from '$lib/controllers/prompt.js';

export async function load(event) {
	return await repoLoad(event);
}

