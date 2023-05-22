import type { RequestEvent } from '@sveltejs/kit';
import { getAllRepos, getDBUser } from '$lib/controllers/shared';

export async function load(event: RequestEvent) {
	const session = await event.locals.getSession()
	const allRepos = getAllRepos()
	let user = null
	
	if(session.user){
		user = getDBUser(event);
	}

	return { user, allRepos };
}
