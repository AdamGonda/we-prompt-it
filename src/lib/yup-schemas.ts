import { object, string, number, boolean } from 'yup';

export const repoSchema = object().shape({
	name: string().required("Name is required").trim().min(5, 'Must be 5 or more characters long'),
	description: string().required("Description is required").min(10, 'Must be 10 or more characters long'),
	content: string().required("Content is required").min(10, 'Must be 10 or more characters long'),
	model: number().required("Model is required"),
	newModelName: string().when('model', {
		is: -1,
		then: (schema) => schema.required('New model name is required').min(5, 'Must be 5 or more characters long)'),
		otherwise: (schema) => schema.optional()
	}),
});
