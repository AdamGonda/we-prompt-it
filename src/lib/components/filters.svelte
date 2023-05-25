<script>
	import { beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { navigationHappendBefore } from '$lib/stores/filters-store';
	import searchStore from '$lib/stores/search-store';
	import { formDataToObject } from '$lib/utils';
	import { onMount } from 'svelte';

	let form;
	let tag;
	let aiModel;
	let sortBy;

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
		tag = searchParams.getAll('tag');
		aiModel = searchParams.get('ai_model');
		sortBy = searchParams.getAll('sort_by');
	}

	function mapFormDataToVars() {
		sortBy = new FormData(form).getAll('sort_by')
	}

	async function handleInput() {
		mapFormDataToVars();

		await searchStore.search({
			endpoint: `/api/search?${varsToQuerystring()}`,
			updateURL: `/explore?${varsToQuerystring()}`
		});
	}

	function varsToQuerystring() {
		let searchParams = new URLSearchParams();

		if (tag) {
			tag.forEach((tagValue) => {
				searchParams.append('tag', tagValue);
			});
		}

		if (aiModel) {
			searchParams.set('ai_model', aiModel);
		}

		if (sortBy) {
			sortBy.forEach((sortValue) => {
				searchParams.append('sort_by', sortValue);
			});
		}

		return searchParams.toString();
	}
</script>

<form
	name="filter-explore"
	method="POST"
	bind:this={form}
	on:input={handleInput}
>
	<fieldset name="sort-by">
		<legend>Sort by</legend>
		<label>
			<input type="checkbox" name="sort_by" value="most_liked"/>
			Most liked
		</label>
		<label>
			<input type="checkbox" name="sort_by" value="most_forked" />
			Most forked
		</label>
	</fieldset>
</form>

<style>

</style>