<script>
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import searchStore from '$lib/stores/search-store';
	import { onMount } from 'svelte';

	let form;
  let text;
  let tag;
  let aiModel;
  let sortBy;

	onMount(() => {
		// load filters from url
		let searchParams = new URLSearchParams($page.url.search);

		text = searchParams.get('text');
		tag = searchParams.getAll('tag');
		aiModel = searchParams.get('ai_model');
		sortBy = searchParams.getAll('sort_by');
	});

	afterNavigate(() => {
		// let searchParams = new URLSearchParams($page.url.search);
		// let q = searchParams.get('q');
		// updateResults(q);
		// trigger search
	});

	beforeNavigate(() => {
		// reset filters
	});

	async function handleSubmit() {
		await searchStore.search('/api/search?tag=education', '/explore?tag=education');
	}
</script>

<form
	name="filter-explore"
	bind:this={form}
	method="POST"
	on:submit|preventDefault={handleSubmit}
>
	<input type="submit" />
</form>
