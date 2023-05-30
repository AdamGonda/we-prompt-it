import { forkPrompt } from '$lib/controllers/actions';
import { loadPrompt } from '$lib/controllers/loders';

export const load = loadPrompt;

export const actions = {
	fork: forkPrompt
};
