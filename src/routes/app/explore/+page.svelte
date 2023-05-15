<script>
	import { page } from '$app/stores';
	import Repo from '$lib/components/repo.svelte';
	

	const { allRepos } = $page.data;
</script>

<main>
	<h1>Explore</h1>

	<h3>All prompts</h3>
	{#each allRepos as repo (repo.id) }
		<Repo {repo}/>
	{/each}

</main>

<style>

	main {
		display: flex;
		flex-direction: column;
	}
</style>
