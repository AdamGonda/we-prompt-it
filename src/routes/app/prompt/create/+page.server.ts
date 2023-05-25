import { createPrompt, loadCreatePrompt } from '$lib/controllers/prompt';

export const load = loadCreatePrompt

export const actions = {
	create: createPrompt
};
