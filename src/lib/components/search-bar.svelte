<script>
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { searchFocused } from '$lib/stores/search-bar-store';
	import searchStore from '$lib/stores/search-store';

	let inputValue;
	let placeholder = 'Find the prompt you need';
	let inputInFocus = false;

	afterNavigate(() => {
		initVarsFromURL();
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
		inputInFocus = true;
	}

	function handleBlur() {
		searchFocused.update((value) => (value = false));
		inputInFocus = false;
	}
</script>

<form name="search" method="POST" class:outlined={inputInFocus} on:submit|preventDefault={handleSubmit}>
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
		<p>go</p>
	</button>
</form>

<style>
	form {
		display: flex;
		align-items: center;
		border: 1px solid rgba(0,0,0,0);
	}

	.outlined {
		border: 1px solid rgb(255, 255, 255);
	}

	input {
		padding: 0 16px;
		border: none;
		min-width: 300px;
		height: 38px;
		font-size: 16px;
		
		background:rgba(0 ,0,0,0);
		border: 2px solid #fff;
		color: #fff;
	}

	input::placeholder {
		color: white;
		font-size: 1rem;
	}

	input:focus {
		outline: none;
	}

	button {
		border: none;
		background: #ffffff;
		cursor: pointer;
		height: 42px;
		width: 45px;
		font-size: 1rem;
		font-weight: bold;
		text-transform: uppercase;
		margin-left: -1px;
	}

	p {
		margin: 0
	}
</style>
