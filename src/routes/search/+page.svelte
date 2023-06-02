<script>
	import { page } from '$app/stores';
	import searchStore from '$lib/stores/search-store';
	import CardList from '$lib/components/card-list.svelte';

	let resultsToShow = [];

	searchStore.subscribe((value) => {
		resultsToShow = value;
	});
</script>

<svelte:head>
	<title>Search | We Prompt</title>
</svelte:head>

<main>
	<CardList prompts={resultsToShow} />
</main>
