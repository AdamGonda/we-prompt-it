<script>
	import { page } from '$app/stores';
	import { results } from '$lib/stores';
	import SearchField from '$lib/components/search-field.svelte';
	import RepoCard from '$lib/components/repo-card.svelte';

	async function onSearch(query) {
		const r = await fetch('/api/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query })
		});

		const newValue = await r.json()
		results.update(value => value = newValue)
	}
</script>

<main>
	<SearchField {onSearch} />

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
