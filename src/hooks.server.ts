import * as Sentry from '@sentry/sveltekit';
import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

Sentry.init({
    dsn: "https://a8a051c3ec2a4041af58bd62df442234@o4505318372474880.ingest.sentry.io/4505318374113280",
    tracesSampleRate: 1
})

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

// First handle authentication, then authorization
// Each function acts as a middleware, receiving the request handle
// And returning a handle which gets passed to the next function
export const handle: Handle = sequence(Sentry.sentryHandle(), sequence(
	SvelteKitAuth({
		providers: [
			Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })
		],
	}),
	authorization
));
export const handleError = Sentry.handleErrorWithSentry();