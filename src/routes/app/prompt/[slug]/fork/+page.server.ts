import { forkPrompt, loadPrompt } from '$lib/controllers/prompt';

export const load = loadPrompt;

export const actions = {
	fork: forkPrompt
};
