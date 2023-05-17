<script lang="ts">
	// TODO autocomplete, get matches from db (just text) and display them in a dropdown normal, and your search in bold
	// TODO navigation bug, if search made on explore, it fucks up the navigation

	import { page } from '$app/stores';
	import { autocompleteOptions, results, searchFocused } from '$lib/stores/search';
	import { goto, afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';

	let form = null;
	let input = null;
	let inputValue = '';
	let placeholder = 'Search by name, description, content, tags, or AI model.';
	let timeoutRef = null;

	if ($page.route.id.includes('explore') && $page.url.searchParams.get('q')) {
		inputValue = $page.url.searchParams.get('q');
	}

	if (browser) {
		window.addEventListener('popstate', handlePropstate);
	}

	afterNavigate(() => {
		if (form && !$page.route.id.includes('explore')) {
			form.reset();
			inputValue = '';
		}
	});

	function delayedAction(query, delay) {
		clearTimeout(timeoutRef);

		timeoutRef = setTimeout(() => {
			if (query) fetchAutocomplete(query);
		}, delay);
	}

	async function fetchAutocomplete(query) {
		const r = await fetch(`/api/autocomplete?q=${query}`);
		const data = await r.json();
		autocompleteOptions.update((value) => (value = data));
	}

	async function updateResults(query) {
		const r = await fetch(`/api/search?q=${query}`);
		const data = await r.json();
		results.update((value) => (value = data));

		if (input) {
			input.blur();
		}
	}

	function handlePropstate() {
		if (!window.location.href.includes('explore')) {
			return;
		}

		let searchParams = new URLSearchParams(window.location.search);
		let q = searchParams.get('q');
		inputValue = q;

		updateResults(q);
	}

	function updateUrl(query) {
		let params = new URLSearchParams(location.search);
		params.set('q', query as string);
		history.pushState({}, '', `${location.pathname}?${params}`);
	}

	async function handleSubmit() {
		const formData = new FormData(form);
		const query = formData.get('query');

		if (!query) return;

		if ($page.route.id.indexOf('explore') === -1) {
			goto(`/app/explore?q=${query}`);
			return;
		}

		updateResults(query);
		updateUrl(query);
	}

	async function handleInput(v) {
		if (!v.target.value) {
			return;
		}

		delayedAction(v.target.value, 500);
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
		on:input={handleInput}
	/>
	<button type="submit">
		<img alt="search" src="/search-icon.svg" />
	</button>
	{#if $autocompleteOptions.length > 0}
		<ul class="autocomplete">
			{#each $autocompleteOptions as option}
				<li>
					{option}
				</li>
			{/each}
		</ul>
	{/if}
</form>

<style>
	form {
		display: flex;
		position: relative;
		align-items: center;
	}
	input {
		font-size: 1.5rem;
		width: 600px;
		padding: 0.5rem;
		border: none;
	}

	input:focus {
		outline: 3px solid orange;
	}
	button {
		width: 50px;
		height: 82%;
		margin-left: 0px;
		border: none;
		background-color: lightsalmon;
		padding: 10px;
	}

	img {
		width: 100%;
		height: 100%;
	}

	.autocomplete {
		position: absolute;
		top: 49px;
		left: 2px;
		right: 52px;
		background-color: white;
		list-style: none;
		padding: 8px 16px;
		margin: 0;
		display: none;
		flex-direction: column;
		gap: 8px;
		z-index: 1;
		border-top: 2px solid lightgray;
	}

	input:focus ~ .autocomplete {
  display: flex;
	}
</style>
