<script>
	// todo
	// when focused, dimm the rest of the page
	// autocomplete, get matches from db (just text) and display them in a dropdown normal, and your search in bold
	// search on enter or cta click
	// clear functionality

	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { goto, afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	let form = null;
	let inputValue = '';

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

	const placeholder = 'Search by name, description, content, tags, or AI model.';

	function handleSubmit({ data, cancel }) {
		const query = data.get('query');

		// todo autocomplete

		if ($page.route.id.indexOf('explore') === -1) {
			goto(`/app/explore?q=${query}`);
			cancel();
		} else {
			location.href = `/app/explore?q=${query}`;
		}

		return async ({ update }) => {
			await update({ reset: false });
		};
	}
</script>

<form autocomplete="off" method="POST" bind:this={form} use:enhance={handleSubmit}>
	<input name="query" type="text" {placeholder} bind:value={inputValue} />
</form>

<style>
	input {
		font-size: 1.5rem;
		width: 600px;
		padding: 0.5rem;
	}
</style>
