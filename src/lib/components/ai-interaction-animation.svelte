<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { getRandomHexColor, getRandomInterval, stringToColor } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	const dispatcher = createEventDispatcher();

	export let hideAfterDone = false;
	export let scale = 1;
	export let text =
		'Feel the thrill of innovation! Let our platform be the catalyst for your eureka moments. Amplify your voice, express your thoughts, and make your mark in this AI-driven world.';

	let words = text.split(' ');
	let toShow = [];
	let width = 400 * scale;
	let fontSize = 20 * scale;
	let ref;
	let tl;

	onMount(() => {
		tl = gsap
			.timeline()
			.delay(1)
			.call(updateToShow)
			.to(ref, { delay: -1, opacity: 1, y: -20, duration: 1 });
	});

	function updateToShow() {
		if (words.length == 0) {
			if(hideAfterDone) {
				tl.to(ref, { opacity: 0, y: 20, duration: 1 });
			}
			return;
		}

		toShow = [...toShow, words.shift()];

		setTimeout(() => {
			updateToShow();
		}, getRandomInterval(10, 400));
	}
</script>

<div
	bind:this={ref}
	out:fade
	class="wrap"
	style={`width: ${width}px; font-size: ${fontSize}px; box-shadow: 0 0 8px ${getRandomHexColor()}`}
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
