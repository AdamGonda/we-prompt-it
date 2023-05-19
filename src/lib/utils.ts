import { error } from '@sveltejs/kit';

export function formToObject(formData, validKeys) {
	const formValues = {};
	for (const [key, value] of formData.entries()) {
		if (!validKeys.includes(key)) {
			throw error(400, {
				message: 'Invalid form key'
			});
		}
		if (!isNaN(value)) {
			formValues[key] = Number(value);
		} else {
			formValues[key] = value;
		}
	}
	return formValues;
}
