import { addRemoveStar } from '$lib/features/star';
import { getDBUser } from '$lib/features/user';

export async function POST(event) {
	const id = event.url.searchParams.get('id');
	const session = await event.locals.getSession();

	if (id && session.user) {
		const user = await getDBUser(event);
		const diff = await addRemoveStar(user.id, Number(id));

		return new Response(JSON.stringify({ status: 200, diff }));
	}

	return new Response(JSON.stringify({ status: 400 }));
}
