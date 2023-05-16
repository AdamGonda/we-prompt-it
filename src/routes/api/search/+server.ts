import { searchRepos } from '$lib/core/repo.js';
import { error } from '@sveltejs/kit';

export async function POST({ request }) {
    const { query } = await request.json();
    const results = await searchRepos(query);

    return new Response(JSON.stringify(results));
}