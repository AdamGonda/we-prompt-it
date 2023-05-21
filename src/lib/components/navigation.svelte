<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import Search from './search.svelte';
	import { page } from '$app/stores';

	const user = $page.data.session?.user;

	function handleSignout() {
		signOut();
	}

	function handleSignin() {
		signIn('google');
	}
</script>

<nav>
	<a href={`/`} data-testid="logo">
		<p>Logo</p>
	</a>
	<Search />

	{#if user}
		<a href={`/app/my-collection`} data-testid="my-collection">
			<p>My collection</p>
		</a>
	{:else}
		<a href={`/login`} data-testid="my-collection">
			<p>My collection</p>
		</a>
	{/if}

	{#if user}
		<a href={`/app/repo/create`} data-testid="create-prompt">
			<p>Create prompt</p>
		</a>
	{:else}
		<a href={`/login`} data-testid="create-prompt">
			<p>Create prompt</p>
		</a>
	{/if}

	{#if user}
		<button style="cursor: pointer;" on:click={handleSignout} data-testid="logout">signout</button>
	{:else}
	<a href={`/login`} data-testid="login">
		<p>Signup/Login</p>
		</a>
	{/if}
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		background: rgb(144, 144, 144);
		padding: 20px 40px;
	}

	a {
		text-decoration: none;
	}
</style>
