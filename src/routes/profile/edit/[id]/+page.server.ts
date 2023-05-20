import { error } from "@sveltejs/kit";

export async function load({ params }) {
	const id = params.id;

	if (!id) {
    throw error(404, {
			message: 'Not found'
		});
	}

	return {  };
}
