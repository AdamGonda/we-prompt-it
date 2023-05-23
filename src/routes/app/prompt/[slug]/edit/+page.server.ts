import { deleteRepo, editRepo, loadEdit } from '$lib/controllers/repo';

export const load = loadEdit

export const actions = {
	edit: editRepo,
	delete: deleteRepo
};
