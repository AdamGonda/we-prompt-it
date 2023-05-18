<script>
	import { page } from '$app/stores';
	import RepoCard from '$lib/components/repo-card.svelte';

	const { session, mostLiked } = $page.data;

	console.log('log $page.data', $page.data)
</script>

<div>
	{#if !session}
		<p>some informative stuff about the platform</p>
	{/if}
  <h2>Most liked</h2>
	{#each mostLiked as repo (repo.id)}
		<RepoCard {repo} />
	{/each}

  <h2>Most rehased</h2>
  
</div>

<style>
</style>
