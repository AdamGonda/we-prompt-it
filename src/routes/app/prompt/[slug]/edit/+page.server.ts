import { deleteRepo, editRepo, loadRepo } from '$lib/controllers/repo';

export const load = loadRepo

export const actions = {
	edit: editRepo,
	delete: deleteRepo
};
