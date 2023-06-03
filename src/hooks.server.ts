import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { getDBUser } from '$lib/controllers/shared';

async function authorization({ event, resolve }) {
	// Protect any routes under /app
	if (event.url.pathname.startsWith('/app')) {
		const session = await event.locals.getSession();
		if (!session) {
			throw redirect(308, '/');
		}
	}

	// If the request is still here, just proceed as normally
	return resolve(event);
}

async function forceOnboarding({ event, resolve }) {
	// Determine if user onboarding is complete
	const session = await event.locals.getSession();

	// not bother with anonymous users
	if (!session) {
		return resolve(event);
	}

	// if cokkie is set, user is onboarded
	if (event.cookies.get('isOnboarded')) {
		return resolve(event);
	}
  
	// at this point
	// 1. user is in session
	// 2. user has no cookie

	// now we need to check if user is in db
	const user = await getDBUser(session);

	// if user is not in db yet but in session, redirect to onboarding to finish creating a user
	if (!user && event.route.id !== '/onboarding') {
    console.log('log redirect')
		throw redirect(308, '/onboarding');
	}

	// if user is in db, cookie probably has been deleted, so we set it again
	if (user) {
		event.cookies.set('isOnboarded=true; Max-Age=86400; Path=/; HttpOnly');
	}
  
  return resolve(event);
}

// First handle authentication, then authorization
// Each function acts as a middleware, receiving the request handle
// And returning a handle which gets passed to the next function
export const handle: Handle = sequence(
	SvelteKitAuth({
		providers: [
			Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })
		]
	}),
	authorization,
	forceOnboarding
);
