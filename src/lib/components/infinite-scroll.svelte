<script>
	import { page } from '$app/stores';
	import searchStore, { isMoreLoading, isSearchLoading } from '$lib/stores/search-store';
	import { onMount } from 'svelte';
	import LoadingIndicator from './loading-indicator.svelte';

	let ref;
	let pageNumber = 0;
	let stop = false;

	searchStore.subscribe(() => {
		stop = false;
	});

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !$isSearchLoading) {
					loadMore();
				}
			});
		});

		observer.observe(ref);

		return () => {
			observer.unobserve(ref);
		};
	});

	async function loadMore() {
		if (stop) return;

		const searchParams = new URLSearchParams($page.url.search);
		searchParams.set('page', (pageNumber += 1).toString());
		const data = await searchStore.loadMore(searchParams);

		console.log('log data', data)
		if (data.length < searchParams.get('limit')) {
			stop = true;
		}
	}
</script>

<div>
	<div class="trigger" bind:this={ref} />
	{#if $isMoreLoading && !$isSearchLoading && !stop}
		<LoadingIndicator height="400px" />
	{/if}

	{#if !$isMoreLoading && !$isSearchLoading && stop}
		<div class="placeholder-wrap">
			<div class="placeholder bubble">
				🤷‍♂️ End of the line! You've scrolled through it all.
			</div>
		</div>
	{/if}
</div>

<style>
	.trigger {
		height: 1px;
		width: 1px;
	}

	.placeholder-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: var(--s-8);
		margin-bottom: var(--s-5);
	}

	.placeholder {
		text-align: center;
	}
</style>
