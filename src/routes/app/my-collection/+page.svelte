<script>
	import { page } from '$app/stores';
	import Card from '$lib/components/card.svelte';

	const myCollection = $page.data;
	// console.log('log myCollection', myCollection)
</script>

<main>
	<h1>My collection</h1>

	<h3>Created by me</h3>
	<div class="all">
		{#each myCollection.createdBy as prompt (prompt.id)}
			<Card {prompt} />
		{/each}
	</div>

	<h3>Forked</h3>
	<div class="all">
		{#each myCollection.forked as prompt (prompt.id)}
			<Card {prompt} />
		{/each}
	</div>

	<h3>Liked</h3>
	<div class="all">
		{#each myCollection.liked as prompt (prompt.id)}
			<Card {prompt} />
		{/each}
	</div>
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
