<script>
	import { beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { navigationHappendBefore } from '$lib/stores/filters-store';
	import { onMount } from 'svelte';

	let form;
	let sortBys;
	$: isChecked = {
		all: !(new URLSearchParams($page.url.search)).get('sort_by'),
		mostLiked: $page.url.search.includes('most_liked'),
		mostForked: $page.url.search.includes('most_forked')
	};
	$: console.log('log', isChecked.all)

	onMount(async () => {
		initVarsFromURL();
	});

	beforeNavigate(() => {
		navigationHappendBefore.set(true);
	});

	function initVarsFromURL() {
		let searchParams = new URLSearchParams($page.url.search);
		sortBys = searchParams.getAll('sort_by');
	}

	function mapFormDataToVars() {
		sortBys = new FormData(form).getAll('sort_by');
	}

	async function triggerSearch() {
		mapFormDataToVars();

		goto(`/explore?${varsToQuerystring()}`);
	}

	function varsToQuerystring() {
		let old = new URLSearchParams($page.url.search);
		let searchParams = new URLSearchParams();

		const text = old.get('text');
		if (text) {
			searchParams.append('text', text);
		}

		if (sortBys) {
			sortBys.forEach((sort) => {
				searchParams.append('sort_by', sort);
			});
		}

		return searchParams.toString();
	}
</script>

<form name="filter-explore" method="POST" bind:this={form} on:input={triggerSearch}>
	<fieldset name="sort-by">
		<label class:selected={isChecked.all}>
			<input
				checked={isChecked.all}
				type="radio"
				name="sort_by"
				value=""
			/>
			All
		</label>
		<label class:selected={isChecked.mostLiked}>
			<input
				checked={isChecked.mostLiked}
				type="radio"
				name="sort_by"
				value="most_liked"
			/>
			Most liked
		</label>
		<label class:selected={isChecked.mostForked}>
			<input
				checked={isChecked.mostForked}
				type="radio"
				name="sort_by"
				value="most_forked"
			/>
			Most forked
		</label>
	</fieldset>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	fieldset {
		border: none;
		padding: 4px 5px;
		margin: 0;
		display: flex;
		font-size: 1rem;
		justify-content: center;
		background: #665f7e80;
		border-radius: 15px;
	}

	label {
		border-radius: 10px;
		padding: 4px 16px;
		cursor: pointer;
		user-select: none;
		font-weight: 600;
		transition: background-color 0.3s ease, color 0.7s ease;
	}

	.selected {
		background: #2e295c;
		color: white;
	}

	input {
		display: none;
	}
</style>
