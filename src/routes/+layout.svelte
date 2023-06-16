<script lang="ts">
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import Navigation from '$lib/components/navigation.svelte';
	import { searchFocused } from '$lib/stores/search-bar-store';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import Footer from '$lib/components/footer.svelte';

	inject({ mode: dev ? 'development' : 'production' });

	const options = {
		duration: 3500,
		pausable: true
	};

	if (browser && $page.data.forceOnboarding) {
		goto('/app/onboarding');
	}
</script>

<SvelteToast {options} />
<Navigation />

<div class="overlay-ref">
	<div class="overlay" class:show={$searchFocused} />
	<div class="content">
		<slot />
	</div>
	<Footer />
</div>

<style>
	@font-face {
		font-family: 'default';
		src: url('/fonts/Poppins-Regular.ttf') format('truetype');
		font-weight: 400;
	}

	@font-face {
		font-family: 'default';
		src: url('/fonts/Poppins-SemiBold.ttf') format('truetype');
		font-weight: 600;
	}

	@font-face {
		font-family: 'default';
		src: url('/fonts/Poppins-ExtraBold.ttf') format('truetype');
		font-weight: 800;
	}

	@font-face {
		font-family: 'source';
		src: url('/fonts/SourceSansPro-Regular.otf') format('opentype');
		font-weight: 400;
	}

	:global(body) {
		margin: 0;
		box-sizing: border-box;
		box-sizing: border-box;
	}

	:global(*) {
		font-family: 'default';
		box-sizing: border-box;

		--s-1: 4px;
		--s-2: 8px;
		--s-3: 12px;
		--s-4: 16px;
		--s-5: 24px;
		--s-6: 34px;
		--s-7: 48px;
		--s-8: 66px;
		--s-9: 80px;
		--s-10: 100px;

		--fs-0: 0.67rem;
		--fs-1: 0.8rem;
		--fs-2: 1rem;
		--fs-3: 1.3rem;
		--fs-3-5: 1.4rem;
		--fs-4: 1.6rem;
		--fs-5: 2.6rem;

		--br-1: 20px;
		--br-2: 30px;

		--sucess: #59a14f;
		--sucess-hover: #467c3b;
		--alert: #edc948;
		--alert-hover: #d7b737;
		--danger: #e15759;
		--danger-hover: #c14245;

		--grey: #e9e9e9;
		--grey-hover: #cdcdcd;
		--black: #333333;
		--white: whitesmoke;
	}

	:global(.bubble) {
		border-radius: var(--br-2);
		padding: var(--s-3) var(--s-4);
	}

	:global(.placeholder) {
		background: var(--grey);
		font-weight: 400;
		max-width: 400px;
		padding: var(--s-5);
		font-size: var(--fs-3);
		border: 2px dashed var(--black);
	}

	/* 
	TODO test out if these global styles if applied are ok
	.bubble {
		border-radius: var(--br-1);
		padding: var(--s-3) var(--s-4);
		cursor: pointer;
		font-size: var(--fs-2);
	}

	.button {
		background: none;
		border: none;
	}

	.button-red {
		background: #e15759;
		color: white;
	}

	.button-green {
		background: #59a14f;
		color: whitesmoke;
	}

	.button:hover {
		background: rgb(211, 31, 31);
	} */

	.content {
		min-height: calc(100vh - 93px);
		padding: var(--s-5) 100px;
		padding-bottom: var(--s-6);
	}

	.overlay-ref {
		position: relative;
		height: 100vh;
	}

	.overlay {
		background: #1b1b1bca;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: none;
		z-index: 10;
	}

	.show {
		display: block;
		animation: fadeIn 0.3s;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
