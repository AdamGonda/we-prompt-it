<svelte:head>
    <title>Home | We Prompt</title> 
</svelte:head>

<script>
	import { page } from '$app/stores';
	import RepoCard from '$lib/components/repo-card.svelte';

	const { session, mostLiked, mostForked } = $page.data;
</script>

<div>
	{#if !session}
		<p>some informative stuff about the platform</p>
	{/if}
	<h2>Most liked</h2>
	{#each mostLiked as repo (repo.id)}
		<RepoCard {repo} />
	{/each}

	<h2>Most forked</h2>
	{#each mostForked as repo (repo.id)}
		<RepoCard {repo} />
	{/each}
</div>

<style>
</style>
