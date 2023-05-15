import { createPrompt } from "$lib/core/models/prompt.js";
import { formToObject } from "$lib/utils";
import { redirect } from "@sveltejs/kit";

export const actions = {
	createPrompt: async (event) => {
        const formData = await event.request.formData();
		const obj = formToObject(formData);

        await createPrompt(event, obj)
        throw redirect(301, '/app');
    },
	
};