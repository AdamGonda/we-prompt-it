import { getUsersCollection } from "$lib/core/user";

export async function load(event) {
	const myCollection = await getUsersCollection(event)

	return { myCollection };
}
