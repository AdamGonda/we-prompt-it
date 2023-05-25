<script>
	import { beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { navigationHappendBefore } from '$lib/stores/filters-store';
	import searchStore from '$lib/stores/search-store';
	import { onMount } from 'svelte';

	let form;
	let tags;
	let aiModels;

	let sortBys;
	$: isChecked = {
		mostLiked: $page.url.search.includes('most_liked'),
		mostForked: $page.url.search.includes('most_forked'),
		tag: (name) => $page.url.search.includes(name),
		aiModel: (name) => $page.url.search.includes(name)
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
		tags = searchParams.getAll('tag');
		aiModels = searchParams.get('ai_model');
		sortBys = searchParams.getAll('sort_by');
	}

	function mapFormDataToVars() {
		sortBys = new FormData(form).getAll('sort_by');
		tags = new FormData(form).getAll('tag');
		aiModels = new FormData(form).getAll('ai_model');
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

		if (tags) {
			tags.forEach((tag) => {
				searchParams.append('tag', tag);
			});
		}

		if (aiModels) {
			aiModels.forEach((model) => {
				searchParams.append('ai_model', model);
			});
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

	<fieldset class="tags">
		<legend>Tags</legend>
		{#each $page.data.tags as tag (tag.id)}
			<label>
				<input checked={isChecked.tag(tag.name)} type="checkbox" name="tag" value={tag.name} />
				{tag.name}
			</label>
		{/each}
	</fieldset>

	<fieldset>
		<legend>AI models</legend>
		{#each $page.data.aiModels as model (model.id)}
			<label>
				<input
					checked={isChecked.aiModel(model.name)}
					type="checkbox"
					name="ai_model"
					value={model.name}
				/>
				{model.name}
			</label>
		{/each}
	</fieldset>
</form>

<style>
	.tags {
		display: flex;
		flex-direction: column;
	}
</style>
