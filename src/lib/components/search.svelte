<script>
	// todo
	// when focused, dimm the rest of the page
	// autocomplete, get matches from db (just text) and display them in a dropdown normal, and your search in bold
	// search on enter or cta click
	// clear functionality

	import { page } from '$app/stores';
	import { results } from '$lib/stores/search';
	import { goto, afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	let form = null;
	let inputValue = '';
	let placeholder = 'Search by name, description, content, tags, or AI model.';

	afterNavigate(() => {
		if (form && $page.route.id === '/app') {
			form.reset();
		}
	});

	onMount(() => {
		if ($page.route.id.includes('explore')) {
			let params = new URLSearchParams(window.location.search);
			inputValue = params.get('q');
		}
	});

	async function handleSubmit() {
		const formData = new FormData(form);
		const query = formData.get('query');

		// todo autocomplete

		if ($page.route.id.indexOf('explore') === -1) {
			goto(`/app/explore?q=${query}`);
		}

		const r = await fetch('/api/search');
		const data = await r.json();
		results.update(value => value = data.results)
	}
</script>

<form autocomplete="off" bind:this={form} on:submit|preventDefault={handleSubmit}>
	<input name="query" type="text" {placeholder} bind:value={inputValue} />
</form>

<style>
	input {
		font-size: 1.5rem;
		width: 600px;
		padding: 0.5rem;
	}
</style>
