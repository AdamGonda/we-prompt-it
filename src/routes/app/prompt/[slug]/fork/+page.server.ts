import { forkPrompt } from '$lib/controllers/actions';
import { loadEditFork } from '$lib/controllers/loders';

export const load = loadEditFork;

export const actions = {
	fork: forkPrompt
};
