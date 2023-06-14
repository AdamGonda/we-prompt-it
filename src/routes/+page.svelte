<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import CardList from '$lib/components/card-list.svelte';
	import routes from '$lib/routes';
	import { onMount } from 'svelte';

	let activeIdx = 0;
	$: prompts = $page.data.loadIndex.topPrompts;

	onMount(() => {
		const cancelInterval = setInterval(() => {
			if (activeIdx < 3) {
				activeIdx++;
			} else {
				activeIdx = 0;
			}
		}, 3000);

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
	<title>Explore, Collect, and Create AI Prompts | We Prompt</title>
	<meta
		name="description"
		content="We Prompt is a platform where you can explore, collect and create AI prompts. Sign up now to join our community."
	/>
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

	<h3>Top 3</h3>
	<CardList {prompts} />
</main>

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
