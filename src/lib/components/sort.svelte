<script>
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { navigationHappendBefore } from '$lib/stores/filters-store';
	import searchStore from '$lib/stores/search-store';
	import { onMount } from 'svelte';

	let form;
	let sortBys;
	$: isChecked = {
		mostLiked: $page.url.search.includes('most_liked'),
		mostForked: $page.url.search.includes('most_forked'),
	};

	onMount(async () => {
		initVarsFromURL();

		if ($navigationHappendBefore) {
			await searchStore.search({
				endpoint: `/api/search?${varsToQuerystring()}`
			});
		}
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

	async function handleInput() {
		mapFormDataToVars();

		await searchStore.search({
			endpoint: `/api/search?${varsToQuerystring()}`,
			updateURL: `/explore?${varsToQuerystring()}`
		});
	}

	function varsToQuerystring() {
		let old = new URLSearchParams($page.url.search);
		const text = old.get('text');
		let searchParams = new URLSearchParams();

		if(text) {
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

<form name="filter-explore" method="POST" bind:this={form} on:input={handleInput}>
	<fieldset name="sort-by">
		<legend>Sort by</legend>
		<label>
			<input
				checked={isChecked.mostLiked}
				type="checkbox"
				name="sort_by"
				value="most_liked"
			/>
			Most liked
		</label>
		<label>
			<input
				checked={isChecked.mostForked}
				type="checkbox"
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
		gap: 16px;
	}

	.tags {
		display: flex;
		flex-direction: column;
	}

	legend {
		font-weight: 600;
	}

	fieldset {
		border: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}

	[type="button"] {
		background: none;
		border: none;
		text-decoration: underline;
		cursor: pointer;
	}
</style>
