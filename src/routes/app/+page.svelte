<script>
	import { page } from '$app/stores';
	import Prompt from '$lib/components/prompt.svelte';
	

	const { allPrompts } = $page.data;
</script>

<h2>Logged in landing</h2>

<main>
	{#each allPrompts as prompt (prompt.id) }
	<Prompt {prompt}/>
	{/each}

</main>

<style>

	main {
		display: flex;
		flex-direction: column;
	}
</style>
