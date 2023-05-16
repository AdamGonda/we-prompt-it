import { searchRepos } from '$lib/core/repo.js';
import { error } from '@sveltejs/kit';

export async function POST({ params }) {
	console.log('log params', params);
	// const { query } = await request.json();
	// const results = await searchRepos(query);

	// return new Response(JSON.stringify(results));
	return new Response(JSON.stringify({ ok: true }));
}
