<svelte:head>
    <title>Home | We Prompt</title> 
</svelte:head>

<script>
	import { page } from '$app/stores';
	import CardList from '$lib/components/card-list.svelte';
	import Card from '$lib/components/card.svelte';

	const { session, mostLiked, mostForked } = $page.data;
	// console.log('log $page.data;', $page.data) 
</script>

<div>
	{#if !session}
		<p>some informative stuff about the platform</p>
	{/if}
	<h2>Most liked</h2>
<CardList prompts={mostLiked} />

<h2>Most forked</h2>
<CardList prompts={mostForked} />
</div>

<style>
</style>
