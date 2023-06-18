<script>
	import { onMount } from 'svelte';

	export let sencente =
		'A place for you and your prompts A place for you and your prompts A place for you and your prompts A place for you and your prompts A place for you and your prompts';

	let words = sencente.split(' ');
	let toShow = [];

	onMount(() => {
		updateToShow(words);
	});

	function updateToShow(words) {
		if (words.length == 0) return;
		toShow = [...toShow, words.shift()];
		setTimeout(() => {
			updateToShow(words);
		}, getRandomInterval(100, 300));
	}

	function getRandomInterval(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
</script>

<div class="wrap">
	{#each toShow as word}
		<span>{word}</span>
	{/each}
	<span class="cursor" />
</div>

<style>
	.wrap {
		display: flex;
		flex-wrap: wrap;
		color: var(--black);
		column-gap: var(--s-1);
    row-gap: 0px;
	}

	.cursor {
		height: 25px;
		width: 15px;
		background-color: var(--black);
		animation: blink 1s steps(5, start) infinite;
	}

	@keyframes blink {
		to {
			visibility: hidden;
		}
	}
</style>
