<script>
	import { goto } from '$app/navigation';
	import routes from '$lib/routes';
	import { onMount } from 'svelte';
	import * as seo from '$lib/seo';
	import AiInteractionAnimation from '$lib/components/ai-interaction-animation.svelte';
	import { getRandomInterval } from '$lib/utils';

	let activeIdx = 0;
	let typeAnims = [
		{
			top: '30',
			left: '100',
			scale: 0.45,
		},
		{
			top: '130',
			left: '60',
			scale: 0.35,
		},
		{
			top: '360',
			left: '160',
			scale: 0.6,
		},
		{
			top: '350',
			left: '100',
			scale: 0.5,
		}
	];
	let typeAnimsToShow = [];

	onMount(() => {
		const cancelInterval = setInterval(() => {
			if (activeIdx < 3) {
				activeIdx++;
			} else {
				activeIdx = 0;
			}
		}, 3000);

		typeAnimsToShow = [...typeAnimsToShow, typeAnims[0]];
		let idx = 1;
		setTimeout(() => {
			if (idx < typeAnims.length) {
				typeAnimsToShow = [...typeAnimsToShow, typeAnims[idx]];
				idx++;

				if (idx == typeAnims.length) {
					idx = 0;
				}
			}
		}, getRandomInterval(100, 400));

		return () => clearInterval(cancelInterval);
	});

	function handleSignUp() {
		goto(routes.login);
	}

	function handleExplore() {
		document.querySelector('input[name="text-search"]').focus();
	}
</script>

<svelte:head>
	<meta property="og:url" content={seo.url} />
	<title>{seo.title}</title>
	<meta property="og:title" content={seo.title} />
	<meta name="description" content={seo.description} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:image" content={seo.image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta property="twitter:image" content={seo.image} />
	<meta property="twitter:card" content={seo.image} />
	<meta property="twitter:title" content={seo.title} />
	<meta property="twitter:description" content={seo.description} />
</svelte:head>

<main>
	<div class="hero-wrap">
		<div>
			<div class="tagline">
				<h1>
					A place for you
					<br />
					and your prompts.
				</h1>
				<h2>
					<span class:active={activeIdx == 0}>Explore</span>,
					<span class:active={activeIdx == 1}>collect</span>,
					<span class:active={activeIdx == 2}>create</span>
					and
					<span class:active={activeIdx == 3}>get noticed</span>.
				</h2>
			</div>

			<div class="cta-s">
				<button class="signup" on:click={handleSignUp}>Sign up</button>
				<button class="explore" on:click={handleExplore}>Explore</button>
			</div>
		</div>
	</div>
</main>

{#each typeAnimsToShow as props}
{/each}
<AiInteractionAnimation props={typeAnims[0]} />

<style>
	.hero-wrap {
		display: flex;
		justify-content: center;
		margin-top: var(--s-5);
	}

	.active {
		position: relative;
		overflow: hidden;
	}

	.active::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 8px;
		left: 0;
		bottom: 0;
		margin-bottom: -8px;
		background: #0067dd;
		animation: appear 0.5s ease-in-out forwards;
	}

	@keyframes appear {
		0% {
			transform-origin: left;
			transform: scaleX(0);
		}
		100% {
			transform-origin: left;
			transform: scaleX(1);
		}
	}

	@keyframes fadeout {
		0% {
			transform-origin: right;
			transform: scaleX(1);
		}
		100% {
			transform-origin: right;
			transform: scaleX(0);
		}
	}

	.tagline {
		text-align: center;
	}

	h1 {
		font-size: 5.5rem;
		margin: 0;
		line-height: 1.15;
		font-weight: 800;
	}

	h2 {
		margin: 0;
		margin-top: var(--s-5);
		font-weight: 400;
		font-size: 1.8rem;
	}

	h3 {
		margin-top: var(--s-10);
	}

	.cta-s {
		display: flex;
		justify-content: center;
		margin-top: var(--s-9);
		gap: var(--s-3);
	}

	.signup,
	.explore {
		border: none;
		font-size: var(--fs-3);
		border-radius: var(--br-2);
		padding: var(--s-3) var(--s-6);
		cursor: pointer;
	}

	.signup {
		color: var(--white);
		background: var(--black);
		margin-right: var(--s-2);
	}

	.explore {
		color: var(--black);
		background: none;
		border: 3px solid var(--black);
		padding: var(--s-2) var(--s-5);
		color: var(--black);
	}
</style>
