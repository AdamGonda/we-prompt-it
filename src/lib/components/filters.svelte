<script>
	import { beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { navigationHappendBefore } from '$lib/stores/filters-store';
	import searchStore from '$lib/stores/search-store';
	import { onMount } from 'svelte';

	let form;
	let tag;
	let aiModel;
	let sortBy;

	onMount(async () => {
		initFiltersFromURL();

		if ($navigationHappendBefore) {
			await searchStore.search({
				endpoint: `/api/search?${getSearchParams()}`
			});
		}
	});

	beforeNavigate(() => {
		navigationHappendBefore.set(true);
	});

	function initFiltersFromURL() {
		let searchParams = new URLSearchParams($page.url.search);
		tag = searchParams.getAll('tag');
		aiModel = searchParams.get('ai_model');
		sortBy = searchParams.getAll('sort_by');
	}

	function getSearchParams() {
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

	async function handleSubmit() {
		await searchStore.search({
			endpoint: `/api/search?${getSearchParams()}`,
			updateURL: `/explore?${getSearchParams()}`
		});
	}
</script>

<form
	name="filter-explore"
	bind:this={form}
	method="POST"
	on:submit|preventDefault={handleSubmit}
>
	<input type="submit" />
</form>
