import type { RequestEvent } from '@sveltejs/kit';
import { getUserByEmail } from '$lib/features/user';
import { getAllRepos } from '$lib/features/shared';

export async function load(event: RequestEvent) {
	const session = await event.locals.getSession()
	const allRepos = getAllRepos()
	let user = null
	
	if(session.user){
		user = getUserByEmail(session.user.email);
	}

	return { user, allRepos };
}
