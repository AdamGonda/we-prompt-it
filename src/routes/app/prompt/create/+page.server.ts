import { createPrompt } from '$lib/controllers/actions';
import { loadCreatePrompt } from '$lib/controllers/loader';

export const load = loadCreatePrompt

export const actions = {
	create: createPrompt
};
