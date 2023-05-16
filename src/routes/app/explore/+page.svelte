<script>
	import { page } from '$app/stores';
	import RepoCard from '$lib/components/repo-card.svelte';

	const { allRepos } = $page.data;
</script>

<main>
	<h1>Explore</h1>

	<h3>All prompts</h3>
	<div class="all">
		{#each allRepos as repo (repo.id)}
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
