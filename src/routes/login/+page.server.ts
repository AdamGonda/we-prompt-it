import { createUser } from '$lib/controllers/actions';
import { loadLogin } from '$lib/controllers/loders';

export const load = loadLogin

export const actions = {
	default: createUser,
};
