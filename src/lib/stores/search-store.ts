import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { toast } from '@zerodevx/svelte-toast';

const { subscribe, set, update } = writable([]);
export const isLoading = writable(false);

async function search({ endpoint, updateURL = '' }) {
	let data;
	isLoading.set(true);

	try {
		const response = await fetch(`${endpoint}`);
		data = await response.json();
		isLoading.set(false);
	} catch (e) {
		toast.push('Something went wrong. Please try again.');
		console.log(e);
	}

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

async function loadMore(searchParams) {
	console.log('log searchParams', searchParams)
	let data;
	// isLoading.set(true);

	try {
		const response = await fetch(`/api/search?${searchParams}`);
		data = await response.json();
		// isLoading.set(false);
	} catch (e) {
		toast.push('Something went wrong. Please try again.');
		console.log(e);
	}

	update((value) => [...value, ...data]);
}

export default {
	subscribe,
	search,
	reset,
	loadMore
};
