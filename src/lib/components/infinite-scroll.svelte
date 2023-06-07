<script>
	import { page } from "$app/stores";
	import searchStore, { isMoreLoading } from "$lib/stores/search-store";

  let pageNumber = 1;
  let stop = false

	async function loadMore() {
    if (stop) return;

		const searchParams = new URLSearchParams($page.url.search);
		searchParams.set('page', (pageNumber += 1).toString());
		const data = await searchStore.loadMore(searchParams);
    
    if (data.length < searchParams.get('limit')) {
      stop = true;
    }
	}
</script>

<div>
  {#if $isMoreLoading}
    <p>Loading...</p>
  {:else}
    <button on:click={loadMore}>Load more</button>
  {/if}
</div>
