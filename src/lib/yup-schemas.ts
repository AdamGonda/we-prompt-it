import { object, string, number, type InferType } from 'yup';

export const promptSchema = object().shape({
	name: string()
		.required('Name is required')
		.trim()
		.min(5, 'Use at least 5 characters.')
		.max(20, 'Limit to 20 characters.'),
	description: string()
		.required('Description is required')
		.trim()
		.min(10, 'Use at least 10 characters.'),
	content: string()
		.required('Content is required')
		.trim()
		.min(10, 'Use at least 10 characters.'),
	model: number().required('Model is required'),
	tags: string().strict().optional(),
	newModelName: string()
		.trim()
		.when('model', {
			is: (value) => value === -1,
			then: (schema) =>
				schema
					.required('New model name is required')
					.trim()
					.min(5, 'Use at least 5 characters.')
					.max(15, 'Limit to 15 characters.'),
			otherwise: (schema) => schema.optional()
		}),
	newModelLink: string()
		.when('model', {
			is: (value) => value === -1,
			then: (schema) => schema.required('New model link is required'),
			otherwise: (schema) => schema.optional()
		})
		.url()
});

export type PromptSchema = InferType<typeof promptSchema>;

export const createUserSchema = object().shape({
	name: string()
		.required('Name is required')
		.trim()
		.min(5, 'Use at least 5 characters.')
		.max(10, 'Limit to 10 characters.')
		.test('name-check', 'Use only lowercase, "-" and "_".', (value) => {
			if (!value) return true; // if string is empty, skip the test
			return /^[a-z0-9]+([-_][a-z0-9]+)*$/.test(value);
		})
});

export type CreateUserSchema = InferType<typeof createUserSchema>;
