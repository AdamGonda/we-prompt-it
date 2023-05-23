import { error } from '@sveltejs/kit';
import { repoSchema, type RepoSchema } from './yup-schemas';

export function formDataToObject(formData) {
	const formValues = {};
	for (const [key, value] of formData.entries()) {
		if(key === 'tags') {
			formValues[key] = formData.getAll('tags')
		}
		else if (value === '') {
			formValues[key] = value;
		} else if (!isNaN(value)) {
			formValues[key] = Number(value);
		} else {
			formValues[key] = value;
		}
	}
	return formValues;
}

export async function validateForm(event): Promise<RepoSchema> {
	const formData = formDataToObject(await event.request.formData());
	const errors = {};

	try {
		repoSchema.validateSync(formData, { abortEarly: false });
	} catch (error) {
		error.inner.forEach((err) => {
			errors[err.path] = err.errors[0];
		});
	}

	if(Object.keys(errors).length > 0) {
		throw error(400, JSON.stringify(errors));
	}

	return formData;
}

export function convertToSlug(username, text) {
	return username + '-' + text.toLowerCase().replace(/ /g, '-');
}
