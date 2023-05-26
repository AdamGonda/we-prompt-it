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
	<div class="filters">
		<Filters />
	</div>

	<div class="card-list">
		{#each resultsToShow as prompt (prompt.id)}
			<Card {prompt} />
		{/each}
	</div>
</main>

<style>
	.filters {
		width: 300px;
		padding: 24px;
		font-size: 1.3rem;
	}
	.card-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 24px;
		width: 100%;
		margin-top: 24px;
	}

	main {
		display: flex;
		gap: 24px;
		padding-right: 24px;
	}
</style>
