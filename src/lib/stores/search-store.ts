import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

const { subscribe, set } = writable([]);

async function search({ endpoint, updateURL = '' }) {
	const response = await fetch(`${endpoint}`);
	const data = await response.json();

	set(data);

	if (updateURL) {
		goto(updateURL, {
			noScroll: true
		});
	}
}

function reset() {
	set([]);
}

export default {
	subscribe,
	search,
	reset
};
