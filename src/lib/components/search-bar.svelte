<script>
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { searchFocused } from '$lib/stores/search-bar-store';

	let inputValue;
	let placeholder = 'Find the prompt you need';
	let inputInFocus = false;

	afterNavigate(async () => {
		initVarsFromURL();
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

		triggerSearch()
	}

	async function triggerSearch() {
		goto(`/?${varsToQuerystring()}`);
	}
</script>

<form
	name="search"
	method="POST"
	class:outlined={inputInFocus}
	on:submit|preventDefault={triggerSearch}
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
		width: 100%;
	}

	input {
		padding: 0 16px;
		border: none;
		min-width: 300px;
		height: 46px;
		font-size: 16px;
		background:#E9E9E9;
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
		color: white;
	}
</style>
