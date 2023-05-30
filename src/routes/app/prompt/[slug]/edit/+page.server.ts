import { deletePrompt, editPrompt } from '$lib/controllers/actions';
import { loadEdit } from '$lib/controllers/loders';

export const load = loadEdit

export const actions = {
	edit: editPrompt,
	delete: deletePrompt
};
