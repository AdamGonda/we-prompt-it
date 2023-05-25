<script>
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { searchFocused } from '$lib/stores/search-bar-store';
	import searchStore from '$lib/stores/search-store';

	let inputValue;
	let placeholder = 'Find the prompt you need';

	afterNavigate(() => {
		initVarsFromURL();
	});

	beforeNavigate(() => {
		inputValue = '';
	});

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

	function handleFocus() {
		searchFocused.update((value) => (value = true));
	}

	function handleBlur() {
		searchFocused.update((value) => (value = false));
	}
</script>

<form name="search" method="POST" on:submit|preventDefault={handleSubmit}>
	<input
		autocomplete="off"
		on:focus={handleFocus}
		on:blur={handleBlur}
		bind:value={inputValue}
		type="text"
		name="text-search"
		{placeholder}
	/>
	<button>
		<img src="/search-icon.svg" alt="search" />
	</button>
</form>

<style>
	form {
		display: flex;
		align-items: center;
	}

	input {
		padding: 0 16px;
		border-top-left-radius: 3px;
		border-bottom-left-radius: 3px;
		border: none;
		min-width: 300px;
		height: 48px;
		font-size: 20px;
	}

	input:focus {
		outline: 3px solid orange;
	}

	button {
		padding: auto 10px;
		border: none;
		background: rgb(255, 255, 255);
		cursor: pointer;
		border-top-right-radius: 3px;
		border-bottom-right-radius: 3px;
		height: 48px;
	}

	img {
		height: 20px;
	}
</style>
