import { writable } from 'svelte/store';

export const results = writable([]);

export const searchFocused = writable(false);

export const autocompleteOptions = writable([]);

// autocompleteOptions.subscribe((options) => {
// 	console.log('log options', options);
// });
