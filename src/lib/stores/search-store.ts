import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { toast } from '@zerodevx/svelte-toast';

const { subscribe, set, update } = writable([]);
export const isSearchLoading = writable(false);
export const isMoreLoading = writable(false);
export const pageNumber = writable(0);

async function search({ endpoint, updateURL = '' }) {
	let data;
	isSearchLoading.set(true);

	try {
		const response = await fetch(`${endpoint}`);
		data = await response.json();
		isSearchLoading.set(false);
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
	let data;
	isMoreLoading.set(true);

	try {
		const response = await fetch(`/api/search?${searchParams}`);
		data = await response.json();
		isMoreLoading.set(false);
	} catch (e) {
		toast.push('Something went wrong. Please try again.');
		console.log(e);
	}

	update((value) => [...value, ...data]);
	return data
}

export default {
	subscribe,
	search,
	reset,
	loadMore
};
