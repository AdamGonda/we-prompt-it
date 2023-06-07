<script>
	import { fade } from 'svelte/transition';
	import searchStore, { isSearchLoading } from '$lib/stores/search-store';
	import CardList from '$lib/components/card-list.svelte';
	import LoadingIndicator from '$lib/components/loading-indicator.svelte';
	import { fadeConfig } from '$lib/config';
	import { onMount } from 'svelte';
	import InfiniteScroll from '$lib/components/infinite-scroll.svelte';

	let resultsToShow = [];
	let isInitialLoad = true;

	onMount(() => {
		isInitialLoad = false;
	});

	searchStore.subscribe((value) => {
		resultsToShow = value;
	});
</script>

<svelte:head>
	<title>Search | We Prompt</title>
</svelte:head>

<main>
	{#if $isSearchLoading}
		<LoadingIndicator />
	{:else if !$isSearchLoading && resultsToShow.length === 0 && !isInitialLoad}
		<div class="placeholder bubble" in:fade={fadeConfig}>
			<p>🤷‍♂️ No results found.<br /> Try searching for something else.</p>
		</div>
	{:else}
		<CardList prompts={resultsToShow} />
	{/if}
	<InfiniteScroll />
</main>

<style>
	.placeholder {
		margin: 0 auto;
		text-align: center;
	}
</style>
