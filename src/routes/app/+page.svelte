<script>
	import { page } from '$app/stores';
	import SearchField from '$lib/components/search-field.svelte';

	function onSearch(query) {
		fetch('/api/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query })
		})
			.then((res) => res.json())
			.then((res) => {
				console.log('log res', res)
			})
	}
</script>

<main>
	<SearchField onSearch={onSearch} />
</main>

<style>
	main {
		padding: 1rem;
	}
</style>
