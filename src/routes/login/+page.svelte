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

<button style="cursor: pointer;" on:click={() => signIn('google')}
	>Continue with google</button
>
