import type { RequestEvent } from '@sveltejs/kit';
import { getUserByEmail } from '$lib/core/user';

export async function load(event: RequestEvent) {
	const user = getUserByEmail((await event.locals.getSession()).user.email);
	return { user };
}
