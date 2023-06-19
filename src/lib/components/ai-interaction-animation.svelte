<script>
	import { onMount } from 'svelte';

	export let scale = .7;
	export let sencente =
		'This change should prevent the flex container from expanding vertically when new lines are added. Please adjust as needed and see if it resolves your issue.';

	let words = sencente.split(' ');
	let toShow = [];
	let width = 500 * scale;
	let fontSize = 20 * scale;

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

<div class="wrap" style={`width: ${width}px; font-size: ${fontSize}px`}>
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
	}

	.wrap span {
		font-family: 'source';
		line-height: 1.6;
	}

	.cursor {
		height: 1.4em;
		width: 0.7em;
		background-color: var(--black);
		animation: blink 1s steps(5, start) infinite;
	}

	@keyframes blink {
		to {
			visibility: hidden;
		}
	}
</style>
