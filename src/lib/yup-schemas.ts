import { object, string, number, type InferType } from 'yup';

export const promptSchema = object().shape({
	name: string()
		.required('Name is required')
		.trim()
		.min(5, 'Must be 5 or more characters long'),
	description: string()
		.required('Description is required')
		.trim()
		.min(10, 'Must be 10 or more characters long'),
	content: string()
		.required('Content is required')
		.trim()
		.min(10, 'Must be 10 or more characters long'),
	model: number().required('Model is required'),
	tags: string().strict().optional(),
	newModelName: string().trim().when('model', {
		is: (value) => value === -1,
		then: (schema) =>
			schema
				.required('New model name is required')
				.trim()
				.min(5, 'Must be 5 or more characters long)'),
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
	.min(5, 'Must be 5 or more characters long')
});

export type OnboardingSchema = InferType<typeof createUserSchema>;