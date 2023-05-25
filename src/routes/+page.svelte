<svelte:head>
    <title>Home | We Prompt</title> 
</svelte:head>

<script>
	import { page } from '$app/stores';
	import PromptCard from '$lib/components/prompt-card.svelte';

	const { session, mostLiked, mostForked } = $page.data;
	// console.log('log $page.data;', $page.data) 
</script>

<div>
	{#if !session}
		<p>some informative stuff about the platform</p>
	{/if}
	<h2>Most liked</h2>
	{#each mostLiked as prompt (prompt.id)}
		<PromptCard {prompt} />
	{/each}

	<h2>Most forked</h2>
	{#each mostForked as prompt (prompt.id)}
		<PromptCard {prompt} />
	{/each}
</div>

<style>
</style>
