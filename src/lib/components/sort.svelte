<script>
	import { beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { navigationHappendBefore } from '$lib/stores/filters-store';
	import { onMount } from 'svelte';

	let form;
	let sortBys;
	$: isChecked = {
		mostLiked: $page.url.search.includes('most_liked'),
		mostForked: $page.url.search.includes('most_forked'),
	};

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

<form name="filter-explore" method="POST" bind:this={form} on:input={triggerSearch}>
	<fieldset name="sort-by">
		<legend>Sort by</legend>
		<label>
			<input
				checked={isChecked.mostLiked}
				type="radio"
				name="sort_by"
				value="most_liked"
			/>
			Most liked
		</label>
		<label>
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
		gap: 16px;
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
</style>
