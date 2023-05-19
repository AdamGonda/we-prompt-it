import { getUsersCollection } from "$lib/features/my-collection";

export async function load(event) {
	const myCollection = await getUsersCollection(event)

	return { myCollection };
}
