<svelte:head>
    <title>Explore | We Prompt</title> 
</svelte:head>

<script>
	import { page } from '$app/stores';
	import Card from '$lib/components/card.svelte';
	import { onMount } from 'svelte';
	import Filters from '$lib/components/filters.svelte';
	import searchStore from '$lib/stores/search-store';

	const { prompts } = $page.data;
	let resultsToShow = prompts;
	let frontendLoaded = false;

	searchStore.subscribe((value) => {
		if (frontendLoaded) {
			resultsToShow = value;
		}
	});

	onMount(() => {
		frontendLoaded = true;
	});
</script>

<main>
	<Filters />

	<div class="card-list">
		{#each resultsToShow as prompt (prompt.id)}
			<Card {prompt} />
		{/each}
	</div>
</main>

<style>
	.card-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 24px;
		width: 100%;
	}

	main {
		display: flex;
		gap: 24px;
		padding: 0 8px;
	}
</style>
