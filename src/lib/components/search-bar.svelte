<script>
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { searchFocused } from '$lib/stores/search-bar-store';
	import searchStore from '$lib/stores/search-store';

	let inputValue;
	let placeholder = 'Find the prompt you need';
	let inputInFocus = false;
	let firstLoad = true;

	afterNavigate(async () => {
		initVarsFromURL();

		if (!firstLoad && $page.route.id.includes('explore')) {
			await searchStore.search({
				endpoint: `/api/search?${varsToQuerystring()}`
			});
		}

		firstLoad = false;
	});

	function initVarsFromURL() {
		let searchParams = new URLSearchParams($page.url.search);
		inputValue = searchParams.get('text');
	}

	async function handleSubmit() {
		goto(`/explore?${varsToQuerystring()}`);
	}

	function varsToQuerystring() {
		let old = new URLSearchParams($page.url.search);
		let searchParams = new URLSearchParams();

		if (inputValue) {
			searchParams.append('text', inputValue);
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

	function handleClear() {
		inputValue = '';

		handleSubmit();
	}
</script>

<form
	name="search"
	method="POST"
	class:outlined={inputInFocus}
	on:submit|preventDefault={handleSubmit}
>
	<div class="search-input-container">
		<input
			autocomplete="off"
			on:focus={handleFocus}
			on:blur={handleBlur}
			bind:value={inputValue}
			type="text"
			name="text-search"
			{placeholder}
		/>
		{#if inputValue}
			<button type="button" on:click={handleClear} class="clear-button">
				<p>x</p>
			</button>
		{/if}
	</div>
</form>

<style>
	form {
		display: flex;
		align-items: center;
		border: 1px solid rgba(0, 0, 0, 0);
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

		background: rgba(0, 0, 0, 0);
		border: 2px solid #fff;
		color: #fff;
		border-radius: 5px;
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
		margin: 0;
	}

	.search-input-container {
		position: relative;
	}

	.clear-button {
		position: absolute;
		top: 50%;
		right: 1px;
		transform: translateY(-50%);
		background: none;
		border: none;
		cursor: pointer;
		color: white;
	}
</style>
