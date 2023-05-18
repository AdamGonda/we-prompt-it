import { getUsersCollection } from "$lib/feature/my-collection";

export async function load(event) {
	const myCollection = await getUsersCollection(event)

	return { myCollection };
}
