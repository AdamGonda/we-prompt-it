import { getUsersCollection } from "$lib/controllers/my-collection";

export async function load(event) {
	const myCollection = await getUsersCollection(event)

	return { myCollection };
}
