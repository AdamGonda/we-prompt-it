import { loadRepo } from '$lib/controllers/repo.js';

export async function load(event) {
	return await loadRepo(event);
}

