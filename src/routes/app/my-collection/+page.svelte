<script>
	import { page } from '$app/stores';
	import CardList from '$lib/components/card-list.svelte';

	const myCollection = $page.data;
</script>

<main>
	<h3>Created</h3>
	<CardList prompts={myCollection.createdBy} />
	
	<h3 class="liked">Liked</h3>
	<CardList prompts={myCollection.liked} />
</main>

<style>
	h3 {
		margin: 0;
		margin-bottom: var(--s-4);
	}

	.liked {
		margin-top: var(--s-6);
	}
	
	main {
		display: flex;
		flex-direction: column;
	}
</style>
