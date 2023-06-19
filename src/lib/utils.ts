import { error } from '@sveltejs/kit';
import type { PromptSchema, CreateUserSchema } from './yup-schemas';

export async function validateForm(
	event,
	schema
): Promise<PromptSchema | CreateUserSchema> {
	const formData = formDataToObject(await event.request.formData());
	const errors = {};

	try {
		schema.validateSync(formData, { abortEarly: false });
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

export async function forceAuth(event) {
	const session = await event.locals.getSession();

	if (!session) {
		throw error(401, 'Unauthorized');
	}

	return session;
}

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

export function convertToSlug(username, text) {
	return (
		username +
		'-' +
		text
			.trim()
			.toLowerCase()
			.replace(/\s/g, '-')
			.replace(/[^a-z0-9-]/g, '')
	);
}

export function stringToColor(str) {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	let color = '#';
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xaf; // change 0x7f to 0xaf
		color += ('00' + value.toString(16)).substr(-2);
	}
	return color;
}

export function hash(str) {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32bit integer
	}

	return hash;
}

export function nameToUsername(name) {
	return name.trim().split(' ').join('-').toLowerCase();
}

export function getRandomInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
