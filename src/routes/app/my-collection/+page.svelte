<script>
	import { page } from '$app/stores';
	import Repo from '$lib/components/repo.svelte';

	const { myCollection } = $page.data;
</script>

<main>
	<h1>My collection</h1>

	<h3>Created by me</h3>
	<div class="all">
		{#each myCollection.createdBy as repo (repo.id)}
			<Repo {repo} />
		{/each}
	</div>

	<h3>Forked</h3>
	<div class="all">
		{#each myCollection.forked as repo (repo.id)}
			<Repo {repo} />
		{/each}
	</div>

	<h3>Starred</h3>
	<div class="all">
		{#each myCollection.starred as repo (repo.id)}
			<Repo {repo} />
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
