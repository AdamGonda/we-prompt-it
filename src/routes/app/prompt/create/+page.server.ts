import { createRepo, loadCreateRepo } from '$lib/controllers/repo';

export const load = loadCreateRepo

export const actions = {
	default: createRepo
};
