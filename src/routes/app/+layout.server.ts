import type { RequestEvent } from '@sveltejs/kit';
import { getUserByEmail } from '$lib/core/models/user';
import { getAllPrompts } from '$lib/core/models/prompt';

export async function load(event: RequestEvent) {
	const user = getUserByEmail((await event.locals.getSession()).user.email);
	const allPrompts = getAllPrompts()

	return { user, allPrompts };
}
