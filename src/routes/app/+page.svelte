<script>
	import { page } from '$app/stores';
	import { query, results } from '$lib/stores/search';
	import SearchField from '$lib/components/search-field.svelte';
	import RepoCard from '$lib/components/repo-card.svelte';

	async function onSearch(q) {
		const r = await fetch('/api/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query: q })
		});

		const newValue = await r.json();
		results.update((value) => (value = newValue));
		query.update((value) => (value = q));
	}



	const searchPlaceholder =
		'Search prompts by name, description, content, tags, or AI model.';
</script>

<main>
	<SearchField query={$query} {onSearch} placeholder={searchPlaceholder}/>

	<div class="all">
		{#each $results as repo (repo.id)}
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
		padding: 1rem;
	}
</style>
