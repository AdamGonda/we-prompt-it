<script>
	import { page } from '$app/stores';
	import CardList from '$lib/components/card-list.svelte';

	const myCollection = $page.data;
</script>

<main>
	<h3>Created</h3>
	<CardList prompts={myCollection.createdBy} />
	
	<h3>Liked</h3>
	<CardList prompts={myCollection.liked} />
</main>

<style>
	h3 {
		margin-top: 56px; 
		margin-bottom: 0;
	}
	main {
		display: flex;
		flex-direction: column;
	}
</style>
