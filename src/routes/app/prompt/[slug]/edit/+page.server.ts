import { deletePrompt, editPrompt } from '$lib/controllers/actions';
import { loadEditFork } from '$lib/controllers/loader';

export const load = loadEditFork

export const actions = {
	edit: editPrompt,
	delete: deletePrompt
};
