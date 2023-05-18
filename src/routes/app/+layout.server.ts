import type { RequestEvent } from '@sveltejs/kit';
import { getUserByEmail } from '$lib/core/user';
import { getAllRepos } from '$lib/core/repo';

export async function load(event: RequestEvent) {
	const session = await event.locals.getSession()
	const allRepos = getAllRepos()
	let user = null
	
	if(session.user){
		user = getUserByEmail(session.user.email);
	}

	return { user, allRepos };
}
