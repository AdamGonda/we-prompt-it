import type { RequestEvent } from '@sveltejs/kit';
import { getUserByEmail } from '$lib/core/user';
import { getAllRepos } from '$lib/core/repo';

export async function load(event: RequestEvent) {
	const user = getUserByEmail((await event.locals.getSession()).user.email);
	const allRepos = getAllRepos()

	return { user, allRepos };
}
