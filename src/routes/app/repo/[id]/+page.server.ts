import loadRepo from '$lib/feature/load-repo.js';

export async function load(event) {
	return await loadRepo(event);
}