import { deletePrompt, editPrompt, loadEdit } from '$lib/controllers/actions';

export const load = loadEdit

export const actions = {
	edit: editPrompt,
	delete: deletePrompt
};
