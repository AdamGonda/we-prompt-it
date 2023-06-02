<script>
	import searchStore, {isLoading} from '$lib/stores/search-store';
	import CardList from '$lib/components/card-list.svelte';
	import LoadingIndicator from '$lib/components/loading-indicator.svelte';

	let resultsToShow = [];
	console.log('log isLoading', $isLoading)

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
	{:else}
		<CardList prompts={resultsToShow} />
	{/if}
</main>
