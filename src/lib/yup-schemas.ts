import { object, string, number, type InferType } from 'yup';

export const repoSchema = object().shape({
	name: string()
		.required('Name is required')
		.trim()
		.min(5, 'Must be 5 or more characters long'),
	description: string()
		.required('Description is required')
		.min(10, 'Must be 10 or more characters long'),
	content: string()
		.required('Content is required')
		.min(10, 'Must be 10 or more characters long'),
	model: number().required('Model is required'),
	tags: string().optional(),
	newModelName: string().when('model', {
		is: (value) => value === -1,
		then: (schema) =>
			schema
				.required('New model name is required')
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

export type RepoSchema = InferType<typeof repoSchema>;
