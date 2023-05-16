<script>
	import { page } from '$app/stores';
	import { query, results } from '$lib/stores/search';
	import SearchField from '$lib/components/search-field.svelte';
	import RepoCard from '$lib/components/repo-card.svelte';

	async function onSearch(q) {
		isLoading = true;
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
		isLoading = false;
	}

	const searchPlaceholder =
		'Search prompts by name, description, content, tags, or AI model.';
	let isLoading = false;
</script>

<main>
	<SearchField query={$query} {onSearch} placeholder={searchPlaceholder} />

	<!-- todo
		trigger search on page load
		tigger search on query change
		tigger search on hitting enter
		if no results show no results message
		if loading show loading indicator
		autocomplite
		querystring in url to make it linkable
		what happens on initial load
	-->

	{#if isLoading}
		<p>Loading...</p>
	{:else if $results.length === 0}
		<p>No results found.</p>
	{:else}
		<div class="all">
			{#each $results as repo (repo.id)}
				<RepoCard {repo} />
			{/each}
		</div>
	{/if}
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
