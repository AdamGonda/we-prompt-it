<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import Navigation from '$lib/components/navigation.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment'

	if(browser && $page.data.session) {
		goto('/app')
	}
</script>

<Navigation />

<p>
	{#if Object.keys($page.data.session || {}).length}
		{#if $page.data.session?.user?.image}
			<img
				src={$page.data.session?.user?.image}
				alt={$page.data.session?.user?.name}
				style="width: 64px; height: 64px;"
			/>
			<br />
		{/if}
		<span>
			<strong>{$page.data.session?.user?.email || $page.data.session?.user?.name}</strong>
		</span>
		<br />
		<span
			>Session expires: {new Date($page.data.session?.expires ?? 0).toUTCString()}</span
		>
		<br />
		<button on:click={() => signOut()} class="button">Sign out</button>
	{:else}
		<span>You are not signed in</span><br />
		<button on:click={() => signIn('google')}>Sign In with Google</button>
	{/if}
</p>

<style>
	:global(body) {
		margin: 0;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
			Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-weight: bold;
		font-size: 25px;
	}
</style>
