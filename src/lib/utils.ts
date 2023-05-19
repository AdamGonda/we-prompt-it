import { error } from '@sveltejs/kit';

export function formToObject(formData) {
	const formValues = {};
	for (const [key, value] of formData.entries()) {
		if (!isNaN(value)) {
			formValues[key] = Number(value);
		} else {
			formValues[key] = value;
		}
	}
	return formValues;
}
