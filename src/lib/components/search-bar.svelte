<script>
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { searchFocused } from '$lib/stores/search-bar-store';
	import searchStore from '$lib/stores/search-store';

	let input;
	let inputValue;
	let placeholder = 'Find the prompt you need';
	let inputInFocus = false;
	let limit = '10'
	let _page = '0'

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
		
		searchParams.append('limit', limit);
		searchParams.append('page', _page);
		
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

	function blurInput(e) {
		if (e.key == 'Escape' && inputInFocus) {
			searchFocused.update((value) => (value = false));
			inputInFocus = false;
			input.blur();
		}
	}
</script>

<svelte:window on:keydown={blurInput} />

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
		height: 46px;
		font-size: 16px;
		background: var(--grey);
		color: var(--black);
		border-radius: 25px;
		width: 100%;
	}

	input:focus {
		outline: none;
	}

	button {
		border: none;
		background: var(--white);
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
		background: var(--grey-hover);
	}

	.clear-button img {
		width: 14px;
		height: 14px;
	}
</style>
