import { getAllAIModels } from '$lib/core/models/ai-model';
import { getPromptById, updatePrompt } from '$lib/core/models/prompt.js';
import { getAllTags } from '$lib/core/models/tag';
import { formToObject } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

export function load({ params }) {
    const id = Number(params.id)
    const prompt = getPromptById(id)
    const aiModels = getAllAIModels()
    const tags = getAllTags()

    return { prompt, aiModels, tags };
}

export const actions = {
	editPrompt: async ({ request, params }) => {
        const formData = await request.formData();
		const obj = formToObject(formData);

		await updatePrompt(Number(params.id), obj);
		throw redirect(301, '/app');
    },
	
};