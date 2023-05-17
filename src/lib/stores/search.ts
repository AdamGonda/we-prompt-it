import { writable } from 'svelte/store';

export const results = writable([]);

export const searchFocused = writable(false);

export const preSearchResultsNo = writable(0);