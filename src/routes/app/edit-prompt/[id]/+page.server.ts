import { getPromptById } from '$lib/core/models/prompt.js';

export function load({ params }) {
    const id = Number(params.id)
    const prompt = getPromptById(id)

    return { prompt };
}

export const actions = {
	editPrompt: async (event) => {
        // todo edit prompt
        console.log('log edit prompt', )
    },
	
};