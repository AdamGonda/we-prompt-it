import { error } from '@sveltejs/kit';
import { promptSchema, type PromptSchema } from './yup-schemas';


export function formDataToObject(formData) {
	const formValues = {};
	for (const [key, value] of formData.entries()) {
		if (value === '') {
			formValues[key] = value;
		} else if (!isNaN(value) && key !== 'tags') {
			formValues[key] = Number(value);
		} else {
			formValues[key] = value;
		}
	}
	return formValues;
}

export async function validateForm(event): Promise<PromptSchema> {
	const formData = formDataToObject(await event.request.formData());
	const errors = {};

	try {
		promptSchema.validateSync(formData, { abortEarly: false });
	} catch (error) {
		error.inner.forEach((err) => {
			errors[err.path] = err.errors[0];
		});
	}

	if (Object.keys(errors).length > 0) {
		throw error(400, JSON.stringify(errors));
	}

	return formData;
}

export function convertToSlug(username, text) {
	return username + '-' + text.toLowerCase().replace(/ /g, '-');
}
