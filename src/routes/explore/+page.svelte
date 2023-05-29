<svelte:head>
    <title>Explore | We Prompt</title> 
</svelte:head>

<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Sort from '$lib/components/sort.svelte';
	import searchStore from '$lib/stores/search-store';
	import CardList from '$lib/components/card-list.svelte';

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
	<!-- <Sort /> -->

	<CardList prompts={resultsToShow} />
</main>

<style>
	.card-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(276px, 1fr));
		padding: 0 104px;
		gap: 34px;
		width: 100%;
		margin-top: 24px;
	}

	main {
		display: flex;
		flex-direction: column;
		gap: 24px;
		padding-top: 24px;
	}
</style>
