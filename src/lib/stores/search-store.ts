import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

const { subscribe, set } = writable([]);

async function search(endpoint, updateURL = false) {
	const response = await fetch(`${endpoint}`);
	const data = await response.json();
	set(data);

	if (updateURL) {
		goto(endpoint);
	}
}

function reset() {
	set([]);
}

export const searchStore = {
	subscribe,
	search,
	reset
};
