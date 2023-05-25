<script>
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { navigationHappendBefore } from '$lib/stores/filters-store';
	import searchStore from '$lib/stores/search-store';
	import { onMount } from 'svelte';

	let form;
	let text;
	let tag;
	let aiModel;
	let sortBy;

	onMount(async () => {
		initFiltersFromURL();

		if ($navigationHappendBefore) {
			await searchStore.search({
				endpoint: `/api/search?${searchParams()}`
			});
		}
	});

	beforeNavigate(() => {
		navigationHappendBefore.set(true);
	});

	function initFiltersFromURL() {
		let searchParams = new URLSearchParams($page.url.search);

		text = searchParams.get('text');
		tag = searchParams.getAll('tag');
		aiModel = searchParams.get('ai_model');
		sortBy = searchParams.getAll('sort_by');
	}

	function searchParams() {
		let searchParams = new URLSearchParams();

		if (text) {
			searchParams.set('text', text);
		}

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
			endpoint: `/api/search?${searchParams()}`,
			updateURL: `/explore?${searchParams()}`
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
