<script>
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import searchStore from '$lib/stores/search-store';

	let firstLoad = true;

	afterNavigate(async () => {		
		if (!firstLoad && $page.route.id == '/') {
			await searchStore.search({
				endpoint: `/api/search${$page.url.search}`
			});
		}

		firstLoad = false;
	})

</script>



<style>
</style>
