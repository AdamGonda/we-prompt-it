<script>
	import { page } from '$app/stores';
	import searchStore from '$lib/stores/search-store';

	let inputValue;
	let placeholder = 'Search for images';

	function initVarsFromURL() {
		let searchParams = new URLSearchParams($page.url.search);
		inputValue = searchParams.get('text');
	}

	async function handleSubmit() {
		await searchStore.search({
			endpoint: `/api/search?${varsToQuerystring()}`,
			updateURL: `/explore?${varsToQuerystring()}`
		});
	}

	function varsToQuerystring() {
		let old = new URLSearchParams($page.url.search);
		let searchParams = new URLSearchParams();

		if (inputValue) {
			searchParams.append('text', inputValue);
		}

		const tags = old.getAll('tag');
		if (tags) {
			tags.forEach((tag) => {
				searchParams.append('tag', tag);
			});
		}

		const aiModels = old.getAll('ai_model');
		if (aiModels) {
			aiModels.forEach((model) => {
				searchParams.append('ai_model', model);
			});
		}

		const sortBys = old.getAll('sort_by');
		if (sortBys) {
			sortBys.forEach((sort) => {
				searchParams.append('sort_by', sort);
			});
		}

		return searchParams.toString();
	}
</script>

<form name="search" method="POST" on:submit|preventDefault={handleSubmit}>
	<input bind:value={inputValue} type="text" name="text-search" {placeholder} />
	<button>search</button>
</form>
