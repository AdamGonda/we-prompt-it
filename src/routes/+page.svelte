<script>
	import { onMount } from 'svelte';

	onMount(() => {
		const card = document.querySelector('.card');
		const motionMatchMedia = window.matchMedia('(prefers-reduced-motion)');
		const THRESHOLD = 10;

		/*
		 * Read the blog post here:
		 * https://letsbuildui.dev/articles/a-3d-hover-effect-using-css-transforms
		 */
		function handleHover(e) {
			const { clientX, clientY, currentTarget } = e;
			const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

			const horizontal = (clientX - offsetLeft) / clientWidth;
			const vertical = (clientY - offsetTop) / clientHeight;
			const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
			const rotateY = (vertical * THRESHOLD - THRESHOLD).toFixed(2);

			card.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
		}

		function resetStyles(e) {
			card.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
		}

		if (!motionMatchMedia.matches) {
			card.addEventListener('mousemove', handleHover);
			card.addEventListener('mouseleave', resetStyles);
		}
	});

	const words = [
		'AI',
		'Prompts',
		'Exploration',
		'Creation',
		'Collection',
		'Innovation',
		'Collaboration',
		'Community',
		'Open-source',
		'Inspiration',
		'Learning',
		'Reputation',
		'Personalization',
		'Forking',
		'Shareability',
		'Engagement',
		'Discovery',
		'User-Friendly',
		'Interactive',
		'Versatility',
		'Diverse',
		'Recognition',
		'Accessibility',
		'Value',
		'Knowledge',
		'Growth',
		'Empowerment',
		'Networking',
		'Achievement',
		'Creativity'
	];

	// create and object from each word and add random font size and weight props to it
	const wordsWithProps = words.map((word) => {
		return {
			word,
			fontSize: Math.random() * (2 - 0.8) + 0.8,
			fontWeight: Math.floor(Math.random() * (900 - 100 + 1) + 100),
			top: Math.floor(Math.random() * 290), // using percentage value to keep the position within the cloud div
			left: Math.floor(Math.random() * 90)
		};
	});
</script>

<svelte:head>
	<title>Home | We Prompt</title>
</svelte:head>

<main>
	<div class="container">
		<article class="card">
			<div class="content">
				{#each wordsWithProps as item (item.word)}
					<span
						class="item"
						style="font-size: {item.fontSize}em; font-weight: {item.fontWeight}; top: {item.top}px; left: {item.left}%;"
					>
						{item.word}
					</span>
				{/each}
			</div>
		</article>
	</div>
</main>

<style>
	main {
		display: grid;
		place-items: center center;
		height: 500px;
		width: 100%;
		overflow: hidden; /* hide words that may overflow due to their random positions */
	}

	.card {
		width: 400px;
		height: 250px;
		margin: auto;
		position: relative;
		transition: transform 0.1s ease;
		transform-style: preserve-3d;
		will-change: transform;
		/* border: 1px solid black; */
	}

	.card:hover .content {
		transform: translateZ(10px);
	}

	.content {
		position: relative;
		z-index: 1;
		transition: transform 0.3s ease;
	}
</style>
