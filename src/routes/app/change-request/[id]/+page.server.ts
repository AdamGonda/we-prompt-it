import { getChangeRequestById } from '$lib/core/change-request';

export async function load({ params }) {
	const changeRequest = getChangeRequestById(Number(params.id));

	return { changeRequest };
}
