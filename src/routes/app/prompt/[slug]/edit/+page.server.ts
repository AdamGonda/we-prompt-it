import { deletePrompt, editPrompt, loadEdit } from '$lib/controllers/prompt';

export const load = loadEdit

export const actions = {
	edit: editPrompt,
	delete: deletePrompt
};
