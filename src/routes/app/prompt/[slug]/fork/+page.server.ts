import { forkRepo, loadRepo } from '$lib/controllers/repo';

export const load = loadRepo;

export const actions = {
	default: forkRepo
};
