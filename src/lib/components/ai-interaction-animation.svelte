<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	export let props = {
		top: '',
		right: '',
		scale: 0.45,
		text: 'This change should prevent the flex container from expanding vertically when new lines are added.'
	}

	let words = props.text.split(' ');
	let toShow = [];
	let width = 500 * props.scale;
	let fontSize = 20 * props.scale;
	let ref;
	let tl;

	onMount(() => {
		tl = gsap.timeline().to(ref, { delay: 0.4, opacity: 1, y: 20, duration: 1 }).call(updateToShow);
	});

	function updateToShow() {
		if (words.length == 0) {
			tl.to(ref, { opacity: 0, y: 40, duration: 1 });
			return;
		}
		toShow = [...toShow, words.shift()];

		setTimeout(() => {
			updateToShow();
		}, getRandomInterval(100, 300));
	}

	function getRandomInterval(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
</script>

<div
	bind:this={ref}
	class="wrap"
	style={`width: ${width}px; font-size: ${fontSize}px; top: ${props.top}px; left: ${props.left}px; right: ${props.right}px`}
>
	{#each toShow as word}
		<span>{word}</span>
	{/each}
	<span class="cursor" />
</div>

<style>
	.wrap {
		display: flex;
		flex-wrap: wrap;
		color: var(--white);
		column-gap: var(--s-1);
		background: var(--black);
		padding: var(--s-3);
		border-radius: 7px;
		position: absolute;
		opacity: 0;
	}

	.wrap span {
		font-family: 'source';
		line-height: 1.6;
	}

	.cursor {
		height: 1.4em;
		width: 0.7em;
		background-color: var(--white);
		animation: blink 1s steps(5, start) infinite;
	}

	@keyframes blink {
		to {
			visibility: hidden;
		}
	}
</style>
