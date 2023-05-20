import mpClient from '$lib/mp-client';

export async function getUserByEmail(email) {
	return await mpClient.user.findUnique({
		where: { email }
	});
}

export async function getDBUser(event) {
	const userEmail = (await event.locals.getSession()).user.email;
	return await getUserByEmail(userEmail);
}
