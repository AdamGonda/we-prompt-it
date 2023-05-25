<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import SearchBar from './search-bar.svelte';
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
	<a href={`/`} >
		<img src="/weprompt-logo.svg" alt="logo" width="50px" />
	</a>
	<SearchBar />

	{#if user}
		<a href={`/app/my-collection`} >
			<p>My collection</p>
		</a>
	{:else}
		<a href={`/login`} >
			<p>My collection</p>
		</a>
	{/if}

	{#if user}
		<a href={`/app/prompt/create`} >
			<p>Create prompt</p>
		</a>
	{:else}
		<a href={`/login`} >
			<p>Create prompt</p>
		</a>
	{/if}

	{#if user}
		<button style="cursor: pointer;" on:click={handleSignout} >signout</button>
	{:else}
	<a href={`/login`} >
		<p>Signup/Login</p>
		</a>
	{/if}
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: rgb(144, 144, 144);
		padding: 10px 40px;
	}

	a {
		text-decoration: none;
	}
</style>
