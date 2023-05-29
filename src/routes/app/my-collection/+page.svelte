<script>
	import { page } from '$app/stores';
	import CardList from '$lib/components/card-list.svelte';
	import Card from '$lib/components/card.svelte';

	const myCollection = $page.data;
	// console.log('log myCollection', myCollection)
</script>

<main>
	<h2>Created by me</h2>
	<CardList prompts={myCollection.createdBy} />
	

	<h2>Forked</h2>
	<CardList prompts={myCollection.forked} />

	<h2>Liked</h2>
	<CardList prompts={myCollection.liked} />
</main>

<style>
	.all {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 16px;
	}
	main {
		display: flex;
		flex-direction: column;
	}
</style>
