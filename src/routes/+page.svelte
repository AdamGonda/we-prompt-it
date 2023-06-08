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
</script>

<svelte:head>
	<title>Home | We Prompt</title>
</svelte:head>

<main>
	<div class="container">
		<article class="card">
			<div class="content">
        <h2 style="position: absolute; bottom: 0;    left: 0;">The Best Beaches</h2>
        <h2 style="position: absolute; bottom: -20px; left: 0;">The Best Beaches</h2>
        <h2 style="position: absolute; bottom: -40px; left: 0;">The Best Beaches</h2>
        <h2 style="position: absolute; bottom: -50px; left: 0;">The Best Beaches</h2>
        <h2 style="position: absolute; bottom: -0px; left: 0;">The Best Beaches</h2>
			</div>
		</article>
	</div>
</main>

<style>
	.card {
		width: 400px;
		height: 250px;
		margin: auto;
		
		padding: 40px;
		position: relative;
		transition: transform 0.1s ease;
		transform-style: preserve-3d;
		will-change: transform;
    border: 1px solid black;
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
