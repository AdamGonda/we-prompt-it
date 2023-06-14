<script>
	import { page } from '$app/stores';
	import searchStore, { isMoreLoading, isSearchLoading, pageNumber } from '$lib/stores/search-store';
	import { onMount } from 'svelte';
	import LoadingIndicator from './loading-indicator.svelte';

	let ref;
	let stop = false;

	isSearchLoading.subscribe((value) => {
		if (value) {
			reset();
		}
	});

	function reset() {
		pageNumber.set(0)
		stop = false;
	}

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if(entry.isIntersecting) {
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
		const searchParams = new URLSearchParams($page.url.search);

		if (stop || !searchParams.get('page') || !searchParams.get('limit')) return;
		
		pageNumber.set($pageNumber + 1)
		searchParams.set('page',($pageNumber + ''));
		const data = await searchStore.loadMore(searchParams);

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
				<spam>🤷‍♂️</spam> End of the line! You've scrolled through it all.
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

	spam {
		display: inline-block;
		font-size: 2rem;
		animation: wobble 2s ease-in;
	}

	@keyframes wobble {
		0% {
			transform: rotate(0deg);
		}
		10% {
			transform: rotate(10deg);
		}
		20% {
			transform: rotate(-10deg);
		}
		30% {
			transform: rotate(10deg);
		}
		40% {
			transform: rotate(-10deg);
		}
		50% {
			transform: rotate(5deg);
		}
		60% {
			transform: rotate(-5deg);
		}
		70% {
			transform: rotate(5deg);
		}
		80% {
			transform: rotate(-5deg);
		}
		90% {
			transform: rotate(2deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}
</style>
