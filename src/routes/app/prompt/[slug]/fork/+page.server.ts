import { forkPrompt } from '$lib/controllers/actions';
import { loadEditFork } from '$lib/controllers/loader';

export const load = loadEditFork;

export const actions = {
	fork: forkPrompt
};
