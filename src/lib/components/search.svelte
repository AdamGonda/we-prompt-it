<script lang="ts">
	// todo
	// autocomplete, get matches from db (just text) and display them in a dropdown normal, and your search in bold
	// search on cta click
	// clear functionality

	import { page } from '$app/stores';
	import { results, searchFocused } from '$lib/stores/search';
	import { goto, afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';

	let form = null;
	let input = null;
	let inputValue = '';
	let placeholder = 'Search by name, description, content, tags, or AI model.';

	if ($page.route.id.includes('explore') && $page.url.searchParams.get('q')) {
		inputValue = $page.url.searchParams.get('q');
	}

	if (browser) {
		window.addEventListener('popstate', handlePropstate);
	}

	afterNavigate(() => {
		if (form && $page.route.id === '/app') {
			form.reset();
			inputValue = '';
		}
	});

	async function handleSubmit() {
		const formData = new FormData(form);
		const query = formData.get('query');

		if (!query) return;

		if ($page.route.id.indexOf('explore') === -1) {
			goto(`/app/explore?q=${query}`);
			return;
		}

		updateResults(query)
		updateUrl(query);
	}

	async function updateResults(query) {
		const r = await fetch(`/api/search?q=${query}`);
		const data = await r.json();
		results.update((value) => (value = data));
		input.blur();
	}

	function handlePropstate() {
		let searchParams = new URLSearchParams(window.location.search);
		let q = searchParams.get('q');
		inputValue = q;

		updateResults(q)
	}

	function updateUrl(query) {
		let params = new URLSearchParams(location.search);
		params.set('q', query as string);
		history.pushState({}, '', `${location.pathname}?${params}`);
	}

	function handleFocus() {
		searchFocused.update((value) => (value = true));
	}

	function handleBlur() {
		searchFocused.update((value) => (value = false));
	}
</script>

<form autocomplete="off" bind:this={form} on:submit|preventDefault={handleSubmit}>
	<input
		name="query"
		type="text"
		{placeholder}
		bind:this={input}
		bind:value={inputValue}
		on:focus={handleFocus}
		on:blur={handleBlur}
	/>
</form>

<style>
	input {
		font-size: 1.5rem;
		width: 600px;
		padding: 0.5rem;
	}

	input:focus {
		outline: 3px solid orange;
	}
</style>
