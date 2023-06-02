<script>
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { searchFocused } from '$lib/stores/search-bar-store';
	import searchStore from '$lib/stores/search-store';

	let input;
	let inputValue;
	let placeholder = 'Find the prompt you need';
	let inputInFocus = false;

	function onKeyDown(e) {
		if (e.key == 'Escape' && inputInFocus) {
			searchFocused.update((value) => (value = false));
			inputInFocus = false;
			input.blur();
		}
	}

	afterNavigate(async () => {
		initVarsFromURL();

		if ($page.route.id.includes('search')) {
			await searchStore.search({
				endpoint: `/api/search${$page.url.search}`
			});
		}
	});

	function initVarsFromURL() {
		let searchParams = new URLSearchParams($page.url.search);
		inputValue = searchParams.get('text');
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

		triggerSearch();
	}

	async function triggerSearch() {
		goto(`/search?${varsToQuerystring()}`);
	}
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<form
	name="search"
	method="POST"
	class:outlined={inputInFocus}
	on:submit|preventDefault={triggerSearch}
>
	<div class="search-input-container">
		<input
			autocomplete="off"
			bind:this={input}
			on:focus={handleFocus}
			on:blur={handleBlur}
			bind:value={inputValue}
			type="text"
			name="text-search"
			{placeholder}
		/>
		{#if inputValue}
			<button type="button" on:click={handleClear} class="clear-button">
				<img src="/x-icon.png" alt="clear" />
			</button>
		{/if}
	</div>
</form>

<style>
	form {
		display: flex;
		align-items: center;
		width: 100%;
	}

	input {
		padding: 0 16px;
		border: none;
		min-width: 300px;
		height: 46px;
		font-size: 16px;
		background: #e9e9e9;
		color: #333333;
		border-radius: 25px;
		width: 100%;
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
		width: 100%;
	}

	.clear-button {
		position: absolute;
		top: 50%;
		right: 1px;
		transform: translateY(-50%);
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}

	.clear-button:hover {
		background: #cdcdcd;
	}

	.clear-button img {
		width: 14px;
		height: 14px;
	}
</style>
