import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { toast } from '@zerodevx/svelte-toast';

const { subscribe, set } = writable([]);
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

export default {
	subscribe,
	search,
	reset
};
