<script>
	import { page } from '$app/stores';
	import Repo from '$lib/components/repo.svelte';
	

	const { myCollection } = $page.data;
</script>

<main>
	<h1>My collection</h1>

	<h3>Created by me</h3>
	{#each myCollection.createdBy as repo (repo.id) }
		<Repo {repo}/>
	{/each}

	<h3>Forked</h3>
	{#each myCollection.forked as repo (repo.id) }
		<Repo {repo}/>
	{/each}


	<h3>Starred</h3>
	{#each myCollection.starred as repo (repo.id) }
		<Repo {repo}/>
	{/each}

</main>

<style>

	main {
		display: flex;
		flex-direction: column;
	}
</style>
