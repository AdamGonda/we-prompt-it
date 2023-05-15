<script>
	import { page } from '$app/stores';
	import Repo from '$lib/components/repo.svelte';
	

	const { allRepos } = $page.data;
</script>

<h2>Logged in landing</h2>

<main>
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
