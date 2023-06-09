<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import CardList from '$lib/components/card-list.svelte';
	import routes from '$lib/routes';
	import { onMount } from 'svelte';

	let items = {
		explore: null,
		collect: null,
		create: null,
		getNoticed: null
	};
	let activeIdx = 1;
	$: prompts = $page.data.loadIndex.topPrompts;

	onMount(() => {
		setInterval(() => {
			let keys = Object.keys(items);
			let index = activeIdx++ % keys.length;
			let previous = items[keys[index - 1]] || items[keys[keys.length - 1]];
			let current = items[keys[index]];

			console.log('log current', current);
			console.log('log previous', previous);

			current.classList.add('active');
			previous.classList.remove('active');
		}, 3000);
	});
</script>

<svelte:head>
	<title>Home | We Prompt</title>
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
					<span class="active" bind:this={items.explore}>Explore</span>,
					<span bind:this={items.collect}>collect</span>,
					<span bind:this={items.create}>create</span>
					and
					<span bind:this={items.getNoticed}>get noticed</span>.
				</h2>
			</div>

			<div class="cta-s">
				<button class="signup" on:click={() => goto(routes.login)}>Sign up</button>
				<button class="explore">Explore</button>
			</div>
		</div>
	</div>

	<h3>Featured</h3>
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
		width: 0;
		height: 8px;
		left: 0;
		bottom: 0;
		margin-bottom: -8px;
		background: #0067dd;
		animation: grow 0.6s ease-in-out forwards;
	}

	@keyframes grow {
		0% {
			width: 0;
		}
		100% {
			width: 100%;
		}
	}

	.tagline {
		text-align: center;
	}

	h1 {
		font-size: 5.5rem;
		margin: 0;
		line-height: 1;
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
		font-weight: 500;
	}
</style>
