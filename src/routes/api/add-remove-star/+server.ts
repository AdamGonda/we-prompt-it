import { addRemoveStar } from '$lib/controllers/star';

export async function POST(event) {
	return await addRemoveStar(event);	
}
