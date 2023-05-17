<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import Search from './search.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const user = $page.data.session?.user;

	function handleSignout() {
		signOut();
	}

	function handleSignin() {
		signIn('google');
	}
</script>

<nav>
	<a href={`/`}>
		<p>Logo</p>
	</a>
	<Search />

	{#if user}
		<a href={`/app/my-collection`}>
			<p>My collection</p>
		</a>
	{:else}
		<a href={`/signup`}>
			<p>My collection</p>
		</a>
	{/if}

	{#if user}
		<a href={`/app/repo/create`}>
			<p>Create prompt</p>
		</a>
	{:else}
		<a href={`/signup`}>
			<p>Create prompt</p>
		</a>
	{/if}

	{#if user}
		<button style="cursor: pointer;" on:click={handleSignout}>signout</button>
	{:else}
		<button style="cursor: pointer;" on:click={handleSignin}>Signin</button>
		/
		<a href={`/signup`}>
			<p>Signup</p>
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
