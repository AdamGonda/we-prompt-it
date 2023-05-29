<script>
	import { page } from '$app/stores';
	import CardList from '$lib/components/card-list.svelte';
	import Card from '$lib/components/card.svelte';

	const myCollection = $page.data;
	// console.log('log myCollection', myCollection)
</script>

<main>
	<h3>Created by me</h3>
	<CardList prompts={myCollection.createdBy} />
	

	<h3>Forked</h3>
	<CardList prompts={myCollection.forked} />

	<h3>Liked</h3>
	<CardList prompts={myCollection.liked} />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
	}
</style>
