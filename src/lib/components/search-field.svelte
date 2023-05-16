<script>
	export let onSearch;
	export let placeholder = 'search';
	export let query = '';

	let timeoutRef = null;
	$: delayedAction(query, 500);

	function delayedAction(query, delay) {
		clearTimeout(timeoutRef);

		timeoutRef = setTimeout(() => {
			if (query) onSearch(query);
		}, delay);
	}
</script>

<input type="text" {placeholder} bind:value={query} />

<style>
	input {
		width: 100%;
		padding: 0.5rem;
		border: 3px solid #ccc;
		border-radius: 0.25rem;
		font-size: 1.5rem;
	}
</style>
