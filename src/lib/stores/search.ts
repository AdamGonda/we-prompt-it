import { writable } from 'svelte/store';

export const results = writable([]);

results.subscribe((value) => console.log('log value', value))