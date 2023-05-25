<svelte:head>
    <title>Explore | We Prompt</title> 
</svelte:head>

<script>
	import { page } from '$app/stores';
	import { results } from '$lib/stores/search-bar-store';
	import Card from '$lib/components/card.svelte';
	import { onMount } from 'svelte';
	import Filters from '$lib/components/filters.svelte';
	import searchStore from '$lib/stores/search-store';

	const { initialResults } = $page.data;
	let resultsToShow = initialResults;
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
	<h1>Explore</h1>

	<h3>All prompts</h3>
	<div class="all">
		{#each resultsToShow as prompt (prompt.id)}
			<Card {prompt} />
		{/each}
	</div>
</main>

<style>
	.all {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 16px;
	}

	main {
		display: flex;
		flex-direction: column;
	}
</style>
