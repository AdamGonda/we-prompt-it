import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

const { subscribe, set } = writable([]);
export const isLoading = writable(false);

async function search({ endpoint, updateURL = '' }) {
	isLoading.set(true);
	const response = await fetch(`${endpoint}`);
	const data = await response.json();
	isLoading.set(false);

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
