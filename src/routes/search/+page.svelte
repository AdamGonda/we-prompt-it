<script>
	import { fade } from 'svelte/transition';
	import searchStore, { isLoading } from '$lib/stores/search-store';
	import CardList from '$lib/components/card-list.svelte';
	import LoadingIndicator from '$lib/components/loading-indicator.svelte';
	import { fadeConfig } from '$lib/config';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { toast } from '@zerodevx/svelte-toast';

	let resultsToShow = [];
	let isInitialLoad = true;
	let pageNumber = 0

	onMount(() => {
		isInitialLoad = false;
	});

	searchStore.subscribe((value) => {
		resultsToShow = value;
		console.log('log resultsToShow', resultsToShow)
	});

	function loadMore() {
		const searchParams = new URLSearchParams($page.url.search);
		searchParams.set('page', (pageNumber += 1).toString());
		searchStore.loadMore(searchParams)
	}
</script>

<svelte:head>
	<title>Search | We Prompt</title>
</svelte:head>

<main>
	{#if $isLoading}
		<LoadingIndicator />
	{:else if !$isLoading && resultsToShow.length === 0 && !isInitialLoad}
		<div class="placeholder bubble" in:fade={fadeConfig}>
			<p>No results found. 🤷‍♂️ <br /> Try searching for something else.</p>
		</div>
	{:else}
		<CardList prompts={resultsToShow} />
	{/if}
	<button on:click={loadMore}>Load More</button>
</main>

<style>
	.placeholder {
		margin: 0 auto;
		text-align: center;
	}
</style>
