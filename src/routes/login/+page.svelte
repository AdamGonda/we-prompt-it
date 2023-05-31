<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';

	const user = $page.data.session?.user;

	if (browser && user) {
		goto('/');
	}
</script>

<svelte:head>
	<title>Login | We Prompt</title>
</svelte:head>

<!-- open ai style -->

<div class="wrap">
	
		<h1>Welcome back, Idea Weaver!</h1>
		<h3>Time to explore, craft, and share those prompts!</h3>
		<button class="bubble" on:click={() => signIn('google')}
			>
			<img src="/google-logo.png" alt="Google Logo" />
			Continue with Google</button
		>
	
</div>

<style>
	h1,
	h3 {
		font-weight: 400;
		text-align: center;
		margin: 0;
	}

	h1 {
		margin: var(--s-3);
		margin-bottom: var(--s-2);
	}

	h3 {
		font-size: var(--fs-2);
		margin-bottom: var(--s-6);
	}

	.wrap {
		display: flex;
		align-items: center;
		flex-direction: column;
		height: 100vh;
		padding-top: var(--s-7);
	}

	button {
		background: #E9E9E9;
		border-radius: var(--br-2);
		display: flex;
		align-items: center;
		padding: var(--s-4);
		gap: var(--s-4);
		border: none;
		cursor: pointer;
		font-weight: 600;
	}

	button img {
		width: 30px
	}
</style>
