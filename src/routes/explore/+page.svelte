<svelte:head>
    <title>Explore | We Prompt</title> 
</svelte:head>

<script>
	import { page } from '$app/stores';
	import { results } from '$lib/stores/search';
	import RepoCard from '$lib/components/prompt-card.svelte';
	import { onMount } from 'svelte';

	const { initialLoadResults } = $page.data;
	let resultsToHow = initialLoadResults;
	let frontendLoaded = false;

	results.subscribe((value) => {
		if (frontendLoaded) {
			resultsToHow = value;
		}
	});

	onMount(() => {
		frontendLoaded = true;
	});
</script>

<main>
	<h1>Explore</h1>

	<h3>All prompts</h3>
	<div class="all">
		{#each resultsToHow as repo (repo.id)}
			<RepoCard {repo} />
		{/each}
	</div>
</main>

<style>
	.all {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 16px;
	}

	main {
		display: flex;
		flex-direction: column;
	}
</style>
