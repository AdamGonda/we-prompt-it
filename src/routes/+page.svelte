<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import searchStore from '$lib/stores/search-store';
	import CardList from '$lib/components/card-list.svelte';
	import Error from './+error.svelte';

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

<svelte:head>
	<title>Home | We Prompt</title>
</svelte:head>

<main>
	<CardList prompts={resultsToShow} />
</main>
