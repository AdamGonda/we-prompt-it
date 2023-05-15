import { getAllAIModels } from "$lib/core/models/ai-model.js";
import { createPrompt } from "$lib/core/models/prompt.js";
import { getAllTags } from "$lib/core/models/tag.js";
import { formToObject } from "$lib/utils";
import { redirect } from "@sveltejs/kit";

export async function load(event) {
	const aiModels = getAllAIModels()
    const tags = getAllTags()

	return { aiModels, tags };
}

export const actions = {
	createPrompt: async (event) => {
        const formData = await event.request.formData();
		const obj = formToObject(formData);

        await createPrompt(event, obj)
        throw redirect(301, '/app');
    },
	
};