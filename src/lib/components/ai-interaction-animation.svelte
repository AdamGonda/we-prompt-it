<script>
	import { onMount } from 'svelte';

	export let sencente =
		'This change should prevent the flex container from expanding vertically when new lines are added. Please adjust as needed and see if it resolves your issue.';

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
    font-family: 'source' !important;
    /* font-size: 10px; */
    /* align-items: start; */
	}

	.cursor {
		height: 25px;
		width: 15px;
    /* transform: scale(0.6); */
		background-color: var(--black);
		animation: blink 1s steps(5, start) infinite;
	}

	@keyframes blink {
		to {
			visibility: hidden;
		}
	}
</style>
