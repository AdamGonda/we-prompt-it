import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

function createSearchStore() {
	const { subscribe, update, set } = writable([]);

	return {
		subscribe,
		search: async (endpoint, query, updateURL = false) => {
			const response = await fetch(`${endpoint}?q=${query}`);
			const data = await response.json();
			update(() => data);
			if (updateURL) {
				goto(`/explore?q=${query}`);
			}
		},
		reset: () => set([]),
	};
}

export const searchStore = createSearchStore();
