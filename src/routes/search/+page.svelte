<script>
	import searchStore, { isLoading } from '$lib/stores/search-store';
	import CardList from '$lib/components/card-list.svelte';
	import LoadingIndicator from '$lib/components/loading-indicator.svelte';

	let resultsToShow = [];

	searchStore.subscribe((value) => {
		resultsToShow = value;
	});
</script>

<svelte:head>
	<title>Search | We Prompt</title>
</svelte:head>

<main>
	{#if $isLoading}
		<LoadingIndicator />
	{:else if resultsToShow.length === 0}
		<div class="placeholder bubble">
			<p>No results found. 🤷‍♂️ Try searching for something else.</p>
		</div>
	{:else}
		<CardList prompts={resultsToShow} />
	{/if}
</main>

<style>
	.placeholder {
		margin: 0 auto;
	}
</style>
