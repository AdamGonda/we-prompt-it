<script>
	import { page } from '$app/stores';
	import CardList from '$lib/components/card-list.svelte';

	$: prompts = $page.data.loadIndex.topPrompts;
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
				<h2>Explore, collect, create and get noticed.</h2>
			</div>
	
			<div class="cta-s">
				<button class="signup">Sign up</button>
				<button class="explore">Explore</button>
			</div>
		</div>
	</div>

	<h3>Top 10</h3>
	<CardList {prompts} />
</main>

<style>

	.hero-wrap {
		display: flex;
		justify-content: center;
		margin-top: var(--s-5);
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
